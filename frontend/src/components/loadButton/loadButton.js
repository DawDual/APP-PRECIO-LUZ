export function createButtons() {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 20px;
        margin: 20px;
    `;

    // Botón para cargar precio de la luz
    const priceButton = document.createElement("button");
    priceButton.id = "load-prices-btn";
    priceButton.classList.add("load-btn");
    priceButton.textContent = "Cargar Precio Luz";
    priceButton.style.cssText = `
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        background: #2196F3;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    `;

    // Botón para cargar tiempo
    const weatherButton = document.createElement("button");
    weatherButton.id = "load-weather-btn";
    weatherButton.classList.add("load-btn");
    weatherButton.textContent = "Cargar Tiempo";
    weatherButton.style.cssText = `
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        background: #4CAF50;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    `;

    // Efectos hover
    priceButton.addEventListener('mouseover', () => {
        priceButton.style.backgroundColor = '#1976D2';
    });
    priceButton.addEventListener('mouseout', () => {
        priceButton.style.backgroundColor = '#2196F3';
    });

    weatherButton.addEventListener('mouseover', () => {
        weatherButton.style.backgroundColor = '#388E3C';
    });
    weatherButton.addEventListener('mouseout', () => {
        weatherButton.style.backgroundColor = '#4CAF50';
    });

    buttonsContainer.appendChild(priceButton);
    buttonsContainer.appendChild(weatherButton);
    
    return buttonsContainer;
}