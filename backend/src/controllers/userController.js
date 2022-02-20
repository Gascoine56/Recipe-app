import { UserService } from '../services/userService.js'
import { tokenAuth } from '../middlewares/tokenAuth.js'
const userService = new UserService()

class UserController {

    constructor(userService) {
        this.userService = userService
    }

    async registerUser(req, res) {
        try {
            if (req.body.userName && req.body.password && req.body.email) {
                const response = await userService.registerUser(req.body)
                res.status(201).send(response)
            } else {
                res.status(400).send('Some field/s are missing')
            }
        } catch (error) {
            res.status(400).send('Bad request')
        }
    }

    async loginUser(req, res) {
        try {
            if (req.body.userName && req.body.password) {
                const response = await userService.loginUser(req.body)
                res.status(200).send(response)
            } else {
                res.status(400).send('One or more required fields missing')
            }
        } catch (error) {
            res.status(401).send('Missing credentials')
        }
    }

    refreshToken(req, res) {
        try {
            const accessToken = tokenAuth.generateAccessToken({ 'userName': req.body.userName, 'password': req.body.password })
            const refreshToken = tokenAuth.generateRefreshToken({ 'userName': req.body.userName, 'password': req.body.password })
            res.status(200).json({accessToken: accessToken, refreshToken: refreshToken})
        } catch (error) {
            res.status(403).send('Invalid refresh token')
        }
    }
}



export { UserController }