import {Sequelize} from 'Sequelize';


const db = new Sequelize(process.env.DATABASE_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host : 'localhost',
    dialect : 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: false
})

export default db