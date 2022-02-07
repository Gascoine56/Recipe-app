import {User} from '../models/User.js'

class UserRepository{
    async registerUser(user){
        const userToSave = new User(user)
        await userToSave.save()
    }
}

export { UserRepository }