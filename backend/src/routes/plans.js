import { Router } from 'express'
const router = Router()
import {PlanController} from '../controllers/planController.js'
const planController = new PlanController()

router.get('/:planId', planController.getPlan)
router.post('/', planController.generateMealPlan)

export {router as plansRouter}