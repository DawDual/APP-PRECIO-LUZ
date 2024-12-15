import express from 'express';
import { fetchData } from '../data/fetchData.js';
const router = express.Router();

//GET DE RANGO DE HORAS POR UN RANGO DE DIAS 
router.get("/start_date=:start/end_date=:end/rangeHours=:range", async (req, res) => {
    try {
        const data = [];
        const fetch  = await fetchData(1,1,startHour,endHour); //<-teneis que ponerle el mes y el dia
        const days = fetch.included[1].attributes.values;
        
        days.map((day) => {
            data.push({
                day: day.date,
                price: day.value,
            });
        });
        
        res.json(data);
    }catch (error) {
        console.error(error);
    }
});

export default router;