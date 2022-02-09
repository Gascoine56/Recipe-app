import { Router } from 'express'
import {RecipeController} from '../controllers/recipeController.js'
import multer from 'multer'
const recipeController = new RecipeController()
const router = Router()

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './backend/uploads/recipeImages/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({
     storage: storage,
     fileFilter: fileFilter
     })


router.get('/', (req, res) => {
    res.status(200).json({
        'response' : 'Viewing recipes'
    })
})

router.post('/', upload.single('imgName'), recipeController.createRecipe)

export { router as recipesRouter}