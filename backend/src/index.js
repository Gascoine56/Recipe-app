import env from "dotenv/config"
import express from 'express';
const app = express();

app.listen(process.env.PORT)