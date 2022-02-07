import env from "dotenv/config"
import express from 'express';
import { usersRoute} from './routes/users.js'
import {recipesRouter} from './routes/recipes.js'

const app = express();

app.use(express.json())

app.use('/users', usersRoute)
app.use('/recipes', recipesRouter)

app.listen(process.env.PORT)