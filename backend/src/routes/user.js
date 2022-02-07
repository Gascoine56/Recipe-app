import { Router } from 'express'
import {UserController} from '../controllers/userController.js'
const userController = new UserController()

const router = Router()

router.post('/register', userController.registerUser)

export { router as usersRoute }