export const createCitySearch = (onCityChange) => {
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('city-search');
    searchContainer.style.cssText = `
        margin: 20px;
        display: flex;
        justify-content: center;
        gap: 10px;
    `;

    // Lista de ciudades españolas principales
    const cities = [
        'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 
        'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao', 
        'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón',
        'Granada', 'A Coruña', 'Vitoria', 'Elche', 'Oviedo',
        'Cartagena', 'Jerez', 'San Sebastián', 'Almería', 'Santander'
    ];

    // Crear datalist para autocompletado
    const datalist = document.createElement('datalist');
    datalist.id = 'cities-list';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        datalist.appendChild(option);
    });

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Buscar ciudad...';
    input.value = 'Madrid';
    input.setAttribute('list', 'cities-list');
    input.style.cssText = `
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
        width: 200px;
        transition: all 0.3s ease;
        background-color: white;
    `;

    const searchButton = document.createElement('button');
    searchButton.textContent = 'Buscar';
    searchButton.style.cssText = `
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background: #4CAF50;
        color: white;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
    `;

    // Efectos hover y focus
    input.addEventListener('focus', () => {
        input.style.borderColor = '#4CAF50';
        input.style.boxShadow = '0 0 0 2px rgba(76, 175, 80, 0.2)';
    });

    input.addEventListener('blur', () => {
        input.style.borderColor = '#ccc';
        input.style.boxShadow = 'none';
    });

    searchButton.addEventListener('mouseover', () => {
        searchButton.style.backgroundColor = '#388E3C';
    });

    searchButton.addEventListener('mouseout', () => {
        searchButton.style.backgroundColor = '#4CAF50';
    });

    // Funcionalidad de búsqueda
    const handleSearch = () => {
        const cityName = input.value.trim();
        if (cityName && cities.includes(cityName)) {
            onCityChange(cityName);
        } else {
            alert('Por favor, seleccione una ciudad de la lista');
        }
    };

    searchButton.addEventListener('click', handleSearch);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Añadir elementos al contenedor
    searchContainer.appendChild(input);
    searchContainer.appendChild(datalist);
    searchContainer.appendChild(searchButton);

    // Soporte para modo oscuro
    const updateTheme = () => {
        const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
        input.style.backgroundColor = isDarkMode ? '#333' : 'white';
        input.style.color = isDarkMode ? 'white' : 'black';
        input.style.borderColor = isDarkMode ? '#555' : '#ccc';
    };

    // Actualizar tema inicial
    updateTheme();

    // Programar la adición del event listener para después de que el botón exista
    setTimeout(() => {
        const toggleButton = document.getElementById('toggle-button');
        if (toggleButton) {
            toggleButton.addEventListener('click', updateTheme);
        }
    }, 0);

    return searchContainer;
}; 