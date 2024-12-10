
export const fetchData = async (month, day, startHour, endHour) => {
    const URL= `https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=2024-${month}-${day}T${startHour}:00&end_date=2024-${month}-${day}T${endHour}:59&time_trunc=hour`;
    console.log(URL);
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const calculateAveragePrice = (data) => {
    if (!data || !Array.isArray(data.included)) {
        throw new Error('Datos inválidos');
    }

    const pvpcData = data.included.find(item => item.type === 'PVPC');
    
    if (!pvpcData?.attributes?.values || !Array.isArray(pvpcData.attributes.values)) {
        throw new Error('No se encontraron valores PVPC');
    }
    const values = pvpcData.attributes.values;
    const totalPrice = values.reduce((sum, item) => sum + item.value, 0);
    const averagePrice = totalPrice / values.length;
    return Number(averagePrice);
};


