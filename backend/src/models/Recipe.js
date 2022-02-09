import sequelize from "sequelize";
const { STRING } = sequelize;
import db from "../../config/database.js";

const Recipe = db.define('recipe', {
    name: STRING,
    instructions: STRING,
    recipeImage: STRING
},
    { timestamps: false })

export { Recipe }