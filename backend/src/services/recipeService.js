import { recipeRepository } from '../repositories/recipeRepository.js'

class RecipeService {

    async createRecipe(recipeName, instructions, imagePath, authorName, authorId) {
        const recipeToSave = {
            recipeName: recipeName,
            instructions: instructions,
            recipeImagePath: imagePath,
            createdAt: Date.now(),
            authorName: authorName,
            userId: authorId
        }
        await recipeRepository.createRecipe(recipeToSave)
    }
}

export { RecipeService }