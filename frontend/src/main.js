import { createSelect } from "./components/createHoursSelect/createHoursSelect";
import { createMonthSelect } from "./components/CreateMothSelect/createMothSelect.js";
import { createButton } from "./components/loadButton/loadButton";
import { createSpinner, showSpinner, hideSpinner } from "./components/spinner/spinner";
import { showButton, createToggleButton } from "./components/toggleButton/toggleButton.js";

// Simula la función de carga de datos
function loadDataPerHour(hour) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Datos cargados para la hora:", hour);
            resolve();
        }, 3000); // Simula un retraso de 3 segundos
    });
}

function handleClick() {
    showSpinner(); // Muestra el spinner
    loadDataPerHour("12:00").then(() => { // Cambia "12:00" por tu lógica de hora
        hideSpinner(); // Oculta el spinner al terminar
    }).catch(error => {
        console.error("Error al cargar datos:", error);
        hideSpinner(); // Oculta el spinner incluso si hay un error
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    // Crea y añade el spinner
    const spinner = createSpinner();
    app.appendChild(spinner);

    // Crea y añade el botón de cargar datos
    const loadPricesButton = createButton();
    app.appendChild(loadPricesButton);
    loadPricesButton.addEventListener("click", handleClick);

    // Crea y añade los selectores
    const selectHours = createSelect();
    app.appendChild(selectHours);

    const selectMonth = createMonthSelect();
    app.appendChild(selectMonth);

    // Crea y muestra el botón de toggle
    createToggleButton();
    showButton();
});