import { Router } from 'express'
import {UserController} from '../controllers/userController.js'
const userController = new UserController()

const router = Router()

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)

export { router as usersRoute }