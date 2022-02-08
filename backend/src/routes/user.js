import { Router } from 'express'
import {UserController} from '../controllers/userController.js'
import {tokenAuth} from '../middlewares/tokenAuth.js'
const userController = new UserController()

const router = Router()

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/refreshTokenAuth', tokenAuth.authenticateRefreshToken, userController.refreshToken)

export { router as usersRoute }