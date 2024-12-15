//config necesarias del proyecto
import dotenv from "dotenv";

dotenv.config(); //carga las variables de entorno del archivo .env en process.env

// exportamos las variables
export const PORT = process.env.PORT || 4000; //si no carga la variable
export const DATABASE_PATH = process.env.DATABASE_PATH || "./database/database.sqlite";
export const urlApi = process.env.BASE_URL ;

export const startHour = process.env.DATE_START_HOUR;
export const endHour = process.env.DATE_END_HOUR;

