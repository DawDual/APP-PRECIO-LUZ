import db from "./database.js";

// Creación de un cliente
export const createUserModel = (username, email, password) => {
    // Inserción en la db de un cliente
    const sql = ""`INSERT INTO user (username, mail, password) VALUES (${username},${email},${password})`;
    db.run(sql);
};

export const getUserByIdModel = (id) => {
    const sql = `SELECT * FROM user WHERE id = ${id}?`;
    db.get(sql);
};

// Obtener todos los usuarios
export const getAllUsersModel = () => {
    const sql = "SELECT * FROM user";
    db.all(sql);
};

// Inicio de la sesión
export const loginModel = (username, password) => {
    const sql = `SELECT * FROM user WHERE username = ${username} AND password = ${password}`;
    db.get(sql);
};

// Obtener usuario por ID

