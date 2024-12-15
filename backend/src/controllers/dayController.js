import { fetchData } from "../data/fetchData.js";
import { createDayModel, getAllDaysModel, getRangeDaysModel, updatePriceDayModel } from "../models/dayModel.js";
import { endHour, startHour } from "../config/config.js";

//Recogemos la data
const data = [];
const fetch  = await fetchData(1,1,startHour,endHour); //<-teneis que ponerle el mes y el dia
const days = fetch.included[1].attributes.values;

days.map((day) => {
    data.push({
        day: day.date,
        price: day.value,
    });
});


//Actualizar precio de dia
export const updatePrice = () => {
    const { day } = req.params;
    const { price} = req.body;
    updatePriceDayModel(day, price);
}

//crear todos los dias
export const createDays = async () => {
    const days = await dataDays();

    //Days debe ser un array 
    if(!Array.isArray(days)){
        return res.status(404).json({error});
    }

    days.forEach((day) => {
        createDayModel(day.price, day.price);
    });
} 

//Traer la data en un periodo de dias
export const getDaysRange = (startDay,endDay) => {
    getRangeDaysModel(startDay, endDay);
}


//Crear dia
export const createDay = () => {
    const { day, price} = req.body; 
    createDayModel(day, price);
}

//Recoger todos los dias
export const getAllDays = () => {
    getAllDaysModel();
}

