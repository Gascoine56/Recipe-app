import { planRepository } from '../repositories/planRepository.js'
import {recipeRepository} from '../repositories/recipeRepository.js'
import { recipePlanJoinRepository} from '../repositories/joinTableRepos/recipePlanRepository.js'
import {random} from '../middlewares/helperFunctions/random.js'

class PlanService {

    async getPlan(userId, planId){
        const plan = await planRepository.getPlan(planId)
        if(plan.userId != userId) return error()
        const recipes = await recipePlanJoinRepository.getPlanRecipes(planId)
        return {plan, recipes}
    }

    async generateMealPlan(
        planName,
        planDescription,
        numberOfDays,
        onlyUserRecipes,
        userId
    ) {
        const planId = await planRepository.createPlan(planName, planDescription, userId)
        const availableRecipes = onlyUserRecipes ? await recipeRepository.getAllRecipesByUser(userId) : await recipeRepository.getAllRecipes()
        const rand = random(numberOfDays, availableRecipes.length)
        let planRecipeIds = []
        rand.forEach(number => planRecipeIds.push(availableRecipes[number-1].id))
        await recipePlanJoinRepository.saveRecipePlanJoin(planId, planRecipeIds)
        return planId
    }
}

export { PlanService }