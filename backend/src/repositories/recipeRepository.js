import {Recipe} from '../models/Recipe.js'

class RecipeRepository {

    async createRecipe(recipeToSave){
        const newRecipe = new Recipe(recipeToSave)
        await newRecipe.save()
    }

}

const recipeRepository = new RecipeRepository()
export { recipeRepository }