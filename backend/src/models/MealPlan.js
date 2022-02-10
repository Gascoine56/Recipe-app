import sequelize from "sequelize";
const { STRING, DOUBLE, TEXT } = sequelize;
import db from "../../config/database.js";

const MealPlan = db.define('mealPlan', {
    name: STRING,
    description: TEXT,
    createdAt: DOUBLE
},
{timestamps: false}
)

export { MealPlan }