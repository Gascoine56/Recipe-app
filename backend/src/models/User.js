import sequelize from "sequelize";
import { Recipe } from './Recipe.js'
import { MealPlan } from './MealPlan.js'
const { STRING } = sequelize;
import db from "../../config/database.js";

const User = db.define('user', {
    userName: STRING,
    password: STRING,
    email: STRING
},
    { timestamps: false })

User.hasMany(Recipe)
User.hasMany(MealPlan)

    export { User }