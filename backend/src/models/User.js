import sequelize from "sequelize";
import {Recipe} from './Recipe.js'
const { STRING } = sequelize;
import db from "../../config/database.js";

const User = db.define('user', {
    userName: STRING,
    password: STRING,
    email: STRING
},
    { timestamps: false })

User.hasMany(Recipe)

export { User }