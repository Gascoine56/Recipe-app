import bcryptjs from "bcryptjs"
import { tokenAuth } from '../middlewares/tokenAuth.js'
import { UserRepository } from '../repositories/userRepository.js'
const userRepository = new UserRepository()

class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async registerUser(requestBody) {
        const { userName, password, email } = requestBody

        const userExists = await userRepository.findUserByNameOrEmail(userName, email)

        if (!userExists) {
            const hashedPassword = await bcryptjs.hash(password, 10)
            const user = {
                userName: userName,
                password: hashedPassword,
                email: email
            }
            await userRepository.registerUser(user)
            return 'User created'
        }
        else {
            return 'User name or email already in use'
        }
    }

    async loginUser(requestBody) {
        const { userName, email, password } = requestBody
        const currentUser = await userRepository.findUserByNameOrEmail(userName, email)
        if (currentUser) {
            if (await bcryptjs.compare(password, currentUser.password)) {
                const user = { userName: currentUser.userName, password: password }
                const accessToken = tokenAuth.generateAccessToken(user)
                const refreshToken = tokenAuth.generateRefreshToken(user)
                return { accessToken: accessToken, refreshToken: refreshToken }
            }
        } return 'Invalid credentials'

    }


}

export { UserService }