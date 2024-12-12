import { createSelect } from "./components/createHoursSelect/createHoursSelect.js";
import { createMonthSelect } from "./components/CreateMothSelect/createMothSelect.js";
import { createButton } from "./components/loadButton/loadButton.js";
import { createSpinner, showSpinner, hideSpinner } from "./components/spinner/spinner.js";
import { showButton, createToggleButton } from "./components/toggleButton/toggleButton.js";

const renderLogin = () => {
    const app = document.getElementById("app");

    app.innerHTML = `
    <div class="login-container" id="login-container">
        <h2>Iniciar Sesión</h2>
        <form id="form-login">
            <input type="text" id="username" name="username" placeholder="Nombre de usuario" required>
            <input type="password" id="password" name="password" placeholder="Contraseña" required>
            <button type="submit">Entrar</button>
        </form>
        <a href="#" id="register-link">Registrarse</a>
    </div>`;

    // Evento para el formulario de login
    document.getElementById("form-login")
        .addEventListener("submit", sendLogin);

    // Evento para el enlace "Registrarse"
    document.getElementById("register-link")
        .addEventListener("click", showRegisterForm);
}

// Función de validación falsa
const validateLogin = (username, password) => {
    return username === "admin" && password === "1234";
}

const hideLogin = () => {
    const loginContainer = document.getElementById("login-container");
    if (loginContainer) {
        loginContainer.style.display = "none";
    }
}

const sendLogin = (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const validLogin = validateLogin(username, password);
    if (validLogin) {
        alert("¡Login exitoso!");
        hideLogin();
        renderNav(); // Renderiza el nav directamente
    } else {
        alert("Usuario o contraseña incorrectos");
    }
    event.target.reset();
}

const showRegisterForm = (event) => {
    event.preventDefault();
    hideLogin(); // Ocultar el login

    const app = document.getElementById("app");
    app.innerHTML = `
    <div class="register-container" id="register-container">
        <h2>Registro</h2>
        <form id="form-register">
            <input type="text" id="reg-username" placeholder="Nombre de usuario" required>
            <input type="password" id="reg-password" placeholder="Contraseña" required>
            <input type="password" id="reg-confirm-password" placeholder="Confirmar contraseña" required>
            <button type="submit" id="register-button" disabled>Registrar</button>
        </form>
        <a href="#" id="back-to-login">Volver al login</a>
    </div>`;

    // Eventos para verificar las contraseñas y habilitar el botón
    document.getElementById("reg-password").addEventListener("input", checkPasswords);
    document.getElementById("reg-confirm-password").addEventListener("input", checkPasswords);

    // Evento para volver al login
    document.getElementById("back-to-login").addEventListener("click", (e) => {
        e.preventDefault();
        renderLogin(); // Renderiza el login nuevamente
    });
}

const checkPasswords = () => {
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;
    const registerButton = document.getElementById("register-button");

    if (password && confirmPassword && password === confirmPassword) {
        registerButton.disabled = false; // Habilita el botón
        registerButton.style.opacity = "1";
    } else {
        registerButton.disabled = true; // Deshabilita el botón
        registerButton.style.opacity = "0.5";
    }
}

// Nueva función para renderizar la navegación
function renderNav() {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpia el contenido anterior

    // Spinner
    const spinner = createSpinner();
    app.appendChild(spinner);

    // Botón de cargar datos
    const loadPricesButton = createButton();
    app.appendChild(loadPricesButton);
    loadPricesButton.addEventListener("click", handleClick);

    // Selector de horas
    const selectHours = createSelect();
    app.appendChild(selectHours);

    // Selector de meses
    const selectMonth = createMonthSelect();
    app.appendChild(selectMonth);

    // Toggle button
    createToggleButton();
    showButton();
}

// Función para manejar la lógica del botón de carga
function handleClick() {
    showSpinner();
    loadDataPerHour("12:00").then(() => {
        hideSpinner();
    }).catch(error => {
        console.error("Error al cargar datos:", error);
        hideSpinner();
    });
}

// Simula una función asíncrona para cargar datos
function loadDataPerHour(hour) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Datos cargados para la hora:", hour);
            resolve();
        }, 3000);
    });
}

renderLogin();
