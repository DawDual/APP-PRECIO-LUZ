const API_KEY = '8954319eb77547a01e2e27e64a784b7e';

export const fetchWeatherData = async (cityName = 'Madrid') => {
    try {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},ES&appid=${API_KEY}&units=metric&lang=es`;
        console.log('URL del tiempo:', URL);
        
        const response = await fetch(URL);
        
        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error response body:', errorBody);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}; 