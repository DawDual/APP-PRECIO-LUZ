// npm install express dotenv sqlite3 /
import cors from "cors"
import express from 'express';
import dayRouter from "./routers/dayRouter.js";
import hoursRouter from "./routers/hoursRouter.js";
import userRouter from "./routers/userRouter.js";
import { PORT } from './config/config.js';

// Crear la instancia de express
const app = express();

app.use(express.json()); 
app.use(cors());

// Rutas 
app.use("/api/days", dayRouter);
app.use("/api/hours", hoursRouter);
app.use("/api/users", userRouter);

// Puerto en el que se va a correr el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
   

