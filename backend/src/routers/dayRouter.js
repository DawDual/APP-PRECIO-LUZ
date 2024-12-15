import { getAllDays, getDaysRange, updatePrice } from '../controllers/dayController.js';

const router = express.Router();

//Recoge todos los dias entre un rango
router.get("/start_date=:start/end_date=:end", () => {
   const { start, end } = req.params;
   // comprobacion de que los parametros sean correctos
    if(isNaN(start) || isNaN(end)) {
        return res.status(404).json({error:"Parametros tienen que ser números"});
    }
    if((start <=0 || start > 31) || (end <=0 || end > 31)) {
        return res.status(404).json({error:"Datos tienen que ser mayores a 0 y menores a 31"});
    }
    if(start > end ){
        return res.status(404).json({error:"La fecha de inicio tiene que ser menor a la fecha ed finalizacion"});
    }

    //devolvemos la data
    getDaysRange(start, end)
    
});

//Devuelve todos los dias
router.get("/", getAllDays);

//Actualizar precio de un dia
router.put("/:day", updatePrice)

export default router;