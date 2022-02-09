import {RecipeService} from '../services/recipeService.js'
const recipeService = new RecipeService()

class RecipeController {

    async createRecipe(req, res) {
        try {
            recipeService.createRecipe(req.body.recipeName, req.body.instructions, req.file.filename, req.userName, req.userId)
            res.status(201).send('Recipe created')
        } catch (error) {
            res.status(400).send()
        }
    }


}

export { RecipeController }