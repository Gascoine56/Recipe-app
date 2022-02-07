import env from "dotenv/config"
import express from 'express';
import db from '../config/database.js'
import { usersRoute } from './routes/user.js'
import { recipesRouter } from './routes/recipes.js'

const app = express();

app.use(express.json());

(async () => {
    await db.sync({ alter: true });
})();

app.use('/user', usersRoute)
app.use('/recipes', recipesRouter)

app.listen(process.env.PORT)