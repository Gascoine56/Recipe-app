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
            throw new Error()
        }
    }

    async loginUser(requestBody) {
        const { userName, password } = requestBody
        const currentUser = await userRepository.findUserByName(userName)
        if (currentUser) {
            if (await bcryptjs.compare(password, currentUser.password)) {
                const user = {userId:currentUser.id, userName: currentUser.userName, password: password }
                const accessToken = tokenAuth.generateAccessToken(user)
                const refreshToken = tokenAuth.generateRefreshToken(user)
                return { accessToken: accessToken, refreshToken: refreshToken }
            }
        } throw Error('Invalid credentials')

    }


}

export { UserService }