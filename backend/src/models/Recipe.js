import sequelize from "sequelize";
const { STRING, DOUBLE, TEXT } = sequelize;
import db from "../../config/database.js";

const Recipe = db.define('recipe', {
    recipeName: STRING,
    instructions: TEXT,
    recipeImagePath: STRING,
    createdAt: DOUBLE,
    authorName: STRING
},
    { timestamps: false })

export { Recipe }