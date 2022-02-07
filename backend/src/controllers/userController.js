import { UserService } from '../services/userService.js'
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
            }else{
                res.status(400).send('Some field/s are missing')
            }
        } catch (error) {
            res.status(400).send('Bad request')
        }
    }

    async loginUser(req, res) {
        try {
            if (req.body.userName || req.body.email){
                const response = await userService.loginUser(req.body)
                res.status(200).send(response)
            }else{
                res.status(400).send('One or more required fields missing')
            } 
        } catch (error) {
            res.status(400).send('Missing credentials')
        }
    }
}



export { UserController }