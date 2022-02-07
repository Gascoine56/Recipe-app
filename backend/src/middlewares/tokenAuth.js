import jwt from 'jsonwebtoken'

class TokenAuth {

    authenticateToken(req, res, next) {
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
}
const tokenAuth = new TokenAuth()
export {tokenAuth}

