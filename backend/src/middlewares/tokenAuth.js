import jwt from 'jsonwebtoken'

class TokenAuth {

    authenticateAccessToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.sendStatus(401)

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            req.userName = user.userName
            req.password = user.password
            next()
        })
    }

    authenticateRefreshToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            req.body.userName = user.userName
            req.body.password = user.password 
            next()
        })        
    }


    generateAccessToken(user) {
        console.log(user);
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' })
    }

    generateRefreshToken(user) {
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '8h' })
    }

}
const tokenAuth = new TokenAuth()
export { tokenAuth }

