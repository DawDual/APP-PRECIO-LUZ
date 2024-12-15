import { createUserModel, getAllUsersModel, getUserByIdModel, loginModel } from "../models/userModel.js";
//models
//traer 1 usuario por id
export const getUserHandler = (req,res) => {
    const { id } = req.params; //tomar la data de los params
    getUserById(id, (err, rows) => {
        if(err){
            res.status(500).json({error:err.message}); //500 = error de conexion
        }else{
            res.status(200).json(rows);
        }
    });
}

//comprobar el login
export const login = (req, res) => {
    const { username, password } = req.body;
    loginModel(username, password, (err, user) => {
        if (err) {
            console.error("Error en la consulta SQL:", err.message);
            return res.status(500).json({ error: "Error del servidor" });
        }
        if (!user) {
            return res.status(401).json({ error: "Datos incorrectas" });
        }
        res.status(200).json(user);
    });
};


// tomar todos los usuarios
export const getAllUsers = (req,res) => {
    getAllUsersModel((err, rows) => {
        if(err){
            res.status(500).json({error:err.message});//500 = error de conexion
        }else{
            res.status(200).json(rows);
        }
    });
}

// crear los usuarios
export const createUser = (req) => {
    const { username, mail, password} = req.body;
    createUserModel(username, mail, password);
}

//borrar usuario
export const deleteCliente = (req,res) => {
    const { id } = req.params; //tomar la data
    deleteClientByIdModel(id);
}
