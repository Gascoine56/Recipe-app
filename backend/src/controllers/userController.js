import { UserService } from '../services/userService.js'
const userService = new UserService()

class UserController {

    constructor(userService) {
        this.userService = userService
    }

    async registerUser(req, res) {
        try {
            const response = await userService.registerUser(req.body.userName, req.body.password)
            res.status(201).send(response)
        } catch (error) {
            res.status(400).send('wrong credentials')
        }
    }
}



export { UserController }