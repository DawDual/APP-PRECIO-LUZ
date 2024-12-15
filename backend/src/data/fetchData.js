import { urlApi } from "../config/config.js";

export const fetchData = async (month, day, startHour, endHour) => {
    console.log(urlApi);
  try {
    const response = await fetch(urlApi);
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