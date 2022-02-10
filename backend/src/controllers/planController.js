import {PlanService} from '../services/planService.js'
const planService = new PlanService()

class PlanController{

    async getPlan(req,res){
        try {
            res.status(200).json(await planService.getPlan(req.userId, req.params.planId))
        } catch (error) {
            res.status(400).send(error)
        }
    }

    async generateMealPlan(req, res){
        try {
            const planId = await planService.generateMealPlan(
                req.body.planName,
                req.body.description,
                req.body.numberOfDays,
                req.body.onlyUserRecipes,
                req.userId)
            res.status(201).json(planId)
        } catch (error) {
            res.status(400).send(error)
        }
    }

}

export {PlanController}