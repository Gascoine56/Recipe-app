import { User } from '../models/User.js'

class UserRepository {

    async findUserByName(userName) {
        return await User.findOne({ where: { userName: userName } })
    }

    async registerUser(user) {
        const userExists = await this.findUserByName(user.userName)
        if (!userExists) {
            const userToSave = new User(user)
            await userToSave.save()
            return 'User created'
        } else {
            return 'User already exists'
        }
    }
}

export { UserRepository }