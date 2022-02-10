import env from "dotenv/config"
import express from 'express';
import db from '../config/database.js'
import { tokenAuth } from './middlewares/tokenAuth.js'
import { usersRoute } from './routes/user.js'
import { recipesRouter } from './routes/recipes.js'
import { plansRouter } from './routes/plans.js'

const app = express();

app.use(express.json());
(async () => {
    await db.sync({ alter: true });
})();

app.use('/uploads', express.static('uploads/'))

app.use('/user', usersRoute)

app.use(tokenAuth.authenticateAccessToken)

app.use('/recipes', recipesRouter)
app.use('/plans', plansRouter)

app.listen(process.env.PORT)