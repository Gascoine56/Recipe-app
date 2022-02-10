import { RecipePlanJoin } from '../../models/joinTables/RecipePlanJoin.js'

class RecipePlanJoinRepository {

    async getPlanRecipes(planId){
        return await RecipePlanJoin.findAll({where: {mealPlanId: planId}})
    }

    async saveRecipePlanJoin(planId, planRecipeIds){
        for (const recipeId of planRecipeIds) {
            await new RecipePlanJoin({ recipeId: recipeId, mealPlanId: planId }).save()
        }
    }
}

const recipePlanJoinRepository = new RecipePlanJoinRepository()
export { recipePlanJoinRepository }