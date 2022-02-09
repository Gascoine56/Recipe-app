import sequelize from "sequelize";
const { STRING, DOUBLE } = sequelize;
import db from "../../config/database.js";

const Recipe = db.define('recipe', {
    recipeName: STRING,
    instructions: STRING,
    recipeImagePath: STRING,
    createdAt: DOUBLE,
    authorName: STRING
},
    { timestamps: false })

export { Recipe }