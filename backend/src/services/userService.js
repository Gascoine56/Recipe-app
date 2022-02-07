import bcryptjs from "bcryptjs"
import { UserRepository } from '../repositories/userRepository.js'
const userRepository = new UserRepository()

class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async registerUser(userName, password) {
        const hashedPassword = await bcryptjs.hash(password, 10)
        const user = {
            userName: userName,
            password: hashedPassword
        }
        return await userRepository.registerUser(user)
    }
}

export { UserService }