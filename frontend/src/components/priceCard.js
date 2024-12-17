import './priceCard.css';

export const createPriceCard = (price, hour) => {
    const card = document.createElement('div');
    card.classList.add('price-card');
    
    const priceFormatted = price.toFixed(2);
    
    card.innerHTML = `
        <h3>Precio de la luz</h3>
        <p>Hora: ${hour}</p>
        <p class="price">${priceFormatted} €/MWh</p>
    `;
    
    return card;
};
