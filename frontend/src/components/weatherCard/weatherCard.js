import './weatherCard.css';

export const createWeatherCard = (weatherData) => {
    const card = document.createElement('div');
    card.classList.add('weather-card');
    
    const temp = Math.round(weatherData.main.temp);
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const cityName = weatherData.name;
    
    card.innerHTML = `
        <h3>Clima en ${cityName}</h3>
        <div class="weather-info">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Clima">
            <div class="weather-details">
                <p class="temperature">${temp}°C</p>
                <p class="description">${description}</p>
            </div>
        </div>
    `;
    
    return card;
}; 