import db from "./database.js";

export const createDayModel = (day, price) =>{
    //Insertar dias a la base de datos
    const sql = `INSERT INTO day (day, price) VALUES (${day}, ${price})`;
    db.run(sql);
}

//Actualizar precio de un dia
export const updatePriceDayModel = (day, price) => {
    const sql = `UPDATE day SET price = ${price} WHERE day = ${day}`;
    db.run(sql)
}

//Recoger todos los dias
export const getAllDaysModel = () => {
    const sql = `SELECT  * FROM day`;
    db.all(sql);
}

//Sacar un rango de dias
export const getRangeDaysModel = (startDate, endDate) => {
    const sql = `SELECT  * FROM day WHERE day >= ${startDate} AND day <= ${endDate}`;
    db.all(sql);
}