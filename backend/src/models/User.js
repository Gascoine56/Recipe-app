import sequelize from "sequelize";
const { STRING } = sequelize;
import db from "../../config/database.js";

const User = db.define('user', {
    userName: STRING,
    password: STRING,
    email: STRING
},
    { timestamps: false })

export { User }