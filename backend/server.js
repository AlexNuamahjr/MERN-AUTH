import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";
import userRoutes from './routes/userRoutes.js';

connectDb();

const port = process.env.PORT || 5050;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>(
    res.send('Hello World')
))

app.use(cookieParser())
app.use('/api/users', userRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
})