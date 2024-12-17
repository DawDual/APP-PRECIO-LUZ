const AUTH_API = 'http://localhost:3000/api';
const DATA_API = 'http://localhost:3001';

export const initDB = async () => {
    try {
        // Verificar conexión con ambos servicios
        const [authResponse, dataResponse] = await Promise.all([
            fetch(`${AUTH_API}/health`),
            fetch(`${DATA_API}/prices`)
        ]);

        if (!authResponse.ok || !dataResponse.ok) {
            throw new Error('Error conectando con los servicios');
        }

        return true;
    } catch (error) {
        console.error('Error de conexión:', error);
        throw error;
    }
};

// Autenticación usando SQLite
export async function createUser(username, password) {
    try {
        const response = await fetch(`${AUTH_API}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Error en el registro');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function validateUser(username, password) {
    try {
        const response = await fetch(`${AUTH_API}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        return data.message === 'Login exitoso';
    } catch (error) {
        console.error('Error validating user:', error);
        return false;
    }
} 