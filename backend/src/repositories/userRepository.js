import { User } from '../models/User.js'
import { Op } from 'Sequelize'

class UserRepository {

    async findUserByNameOrEmail(userName = '', email = '') {
        return await User.findOne({
            where: {
                [Op.or]:
                    [{ userName: userName }, { email: email }]
            }
        })
    }

    async registerUser(user) {
        const userToSave = new User(user)
        await userToSave.save()
    }
}

export { UserRepository }