import { MealPlan } from '../models/MealPlan.js';

class PlanRepository {

    async getPlan(planId){
        return await MealPlan.findOne({where: {id: planId}})
    }

    async createPlan(planName, planDescription, userId) {
        const plan = await new MealPlan({
            name: planName,
            description: planDescription,
            createdAt: Date.now(),
            userId: userId
        }).save()
        return plan.id
    }

}

const planRepository = new PlanRepository()
export { planRepository }