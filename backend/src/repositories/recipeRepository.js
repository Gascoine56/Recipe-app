import {Recipe} from '../models/Recipe.js'

class RecipeRepository {

    async getAllRecipes() {
        return await Recipe.findAll()
    }

    async getAllRecipesByUser(userId) {
        return await Recipe.findAll({ where: { userId: userId } })
    }

    async createRecipe(recipeToSave){
        const newRecipe = new Recipe(recipeToSave)
        await newRecipe.save()
    }

}

const recipeRepository = new RecipeRepository()
export { recipeRepository }