import { Router } from 'express'

const router = Router()

router.post('/register', (req, res) => {
    res.send('Registration')
})

export { router as usersRoute }