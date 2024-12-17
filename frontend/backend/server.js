console.log('Starting server...');

const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const app = express();

app.use(cors());
app.use(express.json());

// Base de datos SQLite
let db;

async function initDB() {
    try {
        db = await open({
            filename: path.join(__dirname, 'database.sqlite'),
            driver: sqlite3.Database
        });

        // Crear tabla de usuarios si no existe
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        `);

        return true;
    } catch (error) {
        console.error('Error initializing database:', error);
        return false;
    }
}

// Rutas de autenticación
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        await db.run(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, password]
        );
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el registro' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await db.get(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [username, password]
        );
        if (user) {
            res.json({ message: 'Login exitoso' });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el login' });
    }
});

// Ruta de health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Manejo de rutas frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
} else {
    app.get('*', (req, res) => {
        res.redirect('http://localhost:5173' + req.path);
    });
}

// Inicializar DB y servidor
initDB().then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
        console.log('Available endpoints:');
        console.log('  - GET /api/health');
    });
}); 