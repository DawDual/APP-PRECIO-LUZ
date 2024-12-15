import express from 'express';
import { createUser, getAllUsers, login } from '../controllers/userController.js';
const router = express.Router();

//Recoger todos los usuarios
router.get("/", getAllUsers);
//Crear usuario
router.post("/register", createUser);
//comprobar el login
router.post("/login", login);

export default router;