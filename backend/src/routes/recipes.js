import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.status(200).json({
        'response' : 'Viewing recipes'
    })
})

export { router as recipesRouter}