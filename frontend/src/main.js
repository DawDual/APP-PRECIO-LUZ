import { createSelect } from "./components/createHoursSelect/createHoursSelect.js";
import { createMonthSelect } from "./components/CreateMothSelect/createMothSelect.js";
import { createButtons } from "./components/loadButton/loadButton.js";
import { createSpinner, showSpinner, hideSpinner } from "./components/spinner/spinner.js";
import { showButton, createToggleButton } from "./components/toggleButton/toggleButton.js";
import { createPriceCard } from "./components/priceCard.js";
import { fetchData, calculateAveragePrice } from "./services/fetchData.js";
import { createPriceChart } from "./components/priceChart.js";
import { fetchWeatherData } from './services/weatherService.js';
import { createWeatherCard } from './components/weatherCard/weatherCard.js';
import { createCitySearch } from './components/citySearch/citySearch.js';
import { initDB, createUser, validateUser } from './services/dbService.js';
import './styles/auth.css';
import { createFooter } from './components/Footer/Footer.js';
import './components/Footer/Footer.css';
import './styles/main.css';
import './components/toggleButton/toggleButton.css';

// Inicializar el tema desde localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);

const renderLogin = () => {
    const app = document.getElementById("app");

    app.innerHTML = `
    <div class="login-container" id="login-container">
        <h2>Bienvenido</h2>
        <form id="form-login">
            <div class="input-group">
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder="Nombre de usuario" 
                    required
                    autocomplete="username"
                >
            </div>
            <div class="input-group">
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Contraseña" 
                    required
                    autocomplete="current-password"
                >
            </div>
            <button type="submit">Iniciar Sesión</button>
        </form>
        <a href="#" id="register-link">¿No tienes cuenta? Regístrate</a>
    </div>`;

    // Evento para el formulario de login
    document.getElementById("form-login")
        .addEventListener("submit", sendLogin);

    // Evento para el enlace "Registrarse"
    document.getElementById("register-link")
        .addEventListener("click", showRegisterForm);
}

// Modificar la función de validación para usar la base de datos
const validateLogin = async (username, password) => {
    return await validateUser(username, password);
}

const hideLogin = () => {
    const loginContainer = document.getElementById("login-container");
    if (loginContainer) {
        loginContainer.style.display = "none";
    }
}

const sendLogin = async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        showSpinner();
        const validLogin = await validateLogin(username, password);
        if (validLogin) {
            alert("¡Login exitoso!");
            hideLogin();
            renderNav();
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    } catch (error) {
        console.error('Error en login:', error);
        alert("Error al intentar iniciar sesión");
    } finally {
        hideSpinner();
        event.target.reset();
    }
}

const showRegisterForm = (event) => {
    event.preventDefault();
    hideLogin();

    const app = document.getElementById("app");
    app.innerHTML = `
    <div class="register-container" id="register-container">
        <h2>Crear Cuenta</h2>
        <form id="form-register">
            <div class="input-group">
                <input 
                    type="text" 
                    id="reg-username" 
                    placeholder="Nombre de usuario" 
                    required
                    autocomplete="username"
                >
            </div>
            <div class="input-group">
                <input 
                    type="password" 
                    id="reg-password" 
                    placeholder="Contraseña" 
                    required
                    autocomplete="new-password"
                >
            </div>
            <div class="input-group">
                <input 
                    type="password" 
                    id="reg-confirm-password" 
                    placeholder="Confirmar contraseña" 
                    required
                    autocomplete="new-password"
                >
            </div>
            <button type="submit" id="register-button" disabled>Registrarse</button>
        </form>
        <a href="#" id="back-to-login">Volver al inicio de sesión</a>
    </div>`;

    // Eventos para verificar las contraseñas y habilitar el botón
    document.getElementById("reg-password").addEventListener("input", checkPasswords);
    document.getElementById("reg-confirm-password").addEventListener("input", checkPasswords);

    // Evento para el formulario de registro
    document.getElementById("form-register").addEventListener("submit", handleRegister);

    // Evento para volver al login
    document.getElementById("back-to-login").addEventListener("click", (e) => {
        e.preventDefault();
        renderLogin();
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

const handleRegister = async (event) => {
    event.preventDefault();
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;

    try {
        showSpinner();
        const success = await createUser(username, password);
        if (success) {
            alert("Usuario registrado exitosamente");
            renderLogin();
        } else {
            alert("Error al registrar usuario. El nombre de usuario podría estar en uso.");
        }
    } catch (error) {
        console.error('Error en registro:', error);
        alert("Error al intentar registrar usuario");
    } finally {
        hideSpinner();
        event.target.reset();
    }
}

// Nueva función para renderizar la navegación
function renderNav() {
    const app = document.getElementById("app");
    app.innerHTML = '';
    
    // Crear wrapper para el contenido
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('content-wrapper');
    
    const nav = document.createElement("nav");
    
    // Crear botones
    const buttonsContainer = createButtons();
    
    // Crear spinner
    const spinner = createSpinner();
    
    // Añadir elementos iniciales al nav
    nav.appendChild(buttonsContainer);
    nav.appendChild(spinner);
    
    // Crear contenedor principal
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('main-container');
    
    // Estructura del DOM
    contentWrapper.appendChild(nav);
    contentWrapper.appendChild(mainContainer);
    app.appendChild(contentWrapper);
    
    // Añadir el footer
    const footer = createFooter();
    app.appendChild(footer);
    
    // Añadir event listeners a los botones
    document.getElementById('load-prices-btn').addEventListener('click', () => {
        // Ocultar buscador de ciudad si existe
        const citySearch = document.querySelector('.city-search');
        if (citySearch) {
            citySearch.remove();
        }

        // Limpiar contenedor de resultados
        const resultsContainer = document.getElementById('results');
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
        }

        // Mostrar controles de fecha/hora si no existen
        if (!document.getElementById('price-controls')) {
            const controlsContainer = document.createElement('div');
            controlsContainer.id = 'price-controls';
            
            // Eliminar el estilo inline y usar clases CSS
            const controlsWrapper = document.createElement('div');
            controlsWrapper.classList.add('controls-wrapper');
            
            const hourSelect = createSelect();
            const dateSelect = createMonthSelect();
            const loadButton = document.createElement('button');
            loadButton.textContent = 'Buscar';
            loadButton.classList.add('btn', 'btn-primary');
            
            controlsWrapper.appendChild(hourSelect);
            controlsWrapper.appendChild(dateSelect.container);
            controlsWrapper.appendChild(loadButton);
            controlsContainer.appendChild(controlsWrapper);
            
            const mainContainer = document.querySelector('.main-container');
            mainContainer.appendChild(controlsContainer);
            
            loadButton.addEventListener('click', () => handlePriceClick(hourSelect, dateSelect));
        }
    });

    document.getElementById('load-weather-btn').addEventListener('click', () => {
        // Ocultar controles de precio si existen
        const priceControls = document.getElementById('price-controls');
        if (priceControls) {
            priceControls.remove();
        }

        // Crear y mostrar el buscador de ciudad
        const existingSearch = document.querySelector('.city-search');
        if (!existingSearch) {
            const citySearch = createCitySearch((cityName) => {
                handleWeatherClick(cityName);
            });
            nav.insertBefore(citySearch, spinner);
        }
        handleWeatherClick('Madrid');
    });
    
    // Crear el botón de tema
    createToggleButton();
}

async function handlePriceClick(hourSelect, dateSelect) {
    try {
        const selectedHour = hourSelect.querySelector('select').value;
        const selectedMonth = dateSelect.getMonth();
        const selectedDay = dateSelect.getDay();
        
        console.log('Valores seleccionados:', {
            hora: selectedHour,
            mes: selectedMonth,
            día: selectedDay
        });

        const endHour = (parseInt(selectedHour) + 6).toString().padStart(2, '0');
        const data = await fetchData(
            selectedMonth,
            selectedDay,
            selectedHour.toString().padStart(2, '0'),
            endHour
        );
        
        const price = calculateAveragePrice(data);
        const priceCard = createPriceCard(price, `${selectedHour}:00 - ${endHour}:00`);
        const priceChart = createPriceChart(data);
        
        const resultsContainer = document.getElementById('results') || document.createElement('div');
        resultsContainer.id = 'results';
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(priceCard);
        resultsContainer.appendChild(priceChart);
        
        const mainContainer = document.querySelector('.main-container');
        if (!document.getElementById('results')) {
            mainContainer.appendChild(resultsContainer);
        }
    } catch (error) {
        console.error('Error procesando datos de precio:', error);
        alert('Error al procesar los datos de precio: ' + error.message);
    }
}

async function handleWeatherClick(cityName = 'Madrid') {
    showSpinner();
    
    try {
        const weatherData = await fetchWeatherData(cityName);
        const weatherCard = createWeatherCard(weatherData);
        
        const resultsContainer = document.getElementById('results') || document.createElement('div');
        resultsContainer.id = 'results';
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(weatherCard);
        
        const mainContainer = document.querySelector('.main-container');
        if (!document.getElementById('results')) {
            mainContainer.appendChild(resultsContainer);
        }
    } catch (error) {
        console.error('Error procesando datos del tiempo:', error);
        alert('Error al procesar los datos del tiempo');
    } finally {
        hideSpinner();
    }
}

// Inicializar la base de datos al cargar la aplicación
initDB().then(() => {
    console.log('Base de datos inicializada');
    renderLogin();
}).catch(error => {
    console.error('Error inicializando la base de datos:', error);
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="error-container">
            <h2>Error de conexión</h2>
            <p>${error.message}</p>
            <button onclick="location.reload()">Reintentar</button>
        </div>
    `;
});

