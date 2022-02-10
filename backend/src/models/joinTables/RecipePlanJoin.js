import sequelize from "sequelize";
import { Recipe } from '../Recipe.js'
import { MealPlan } from '../MealPlan.js'
import db from "../../../config/database.js";

const RecipePlanJoin = db.define('recipePlanJoin', {
}, { timestamps: false })

RecipePlanJoin.belongsTo(Recipe)
RecipePlanJoin.belongsTo(MealPlan)

export {RecipePlanJoin}