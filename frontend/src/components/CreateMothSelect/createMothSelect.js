export function createMonthSelect() {
    const container = document.createElement('div');
    container.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    const label = document.createElement('label');
    label.textContent = 'Día:';
    label.style.fontWeight = 'bold';

    const daySelect = document.createElement('select');
    daySelect.style.cssText = `
        padding: 8px;
        border-radius: 4px;
        border: 1px solid var(--border-color);
    `;

    // Obtener el mes actual
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const year = currentDate.getFullYear();
    
    // Calcular días en el mes actual
    const daysInMonth = new Date(year, currentMonth, 0).getDate();

    // Generar opciones para los días
    for (let i = 1; i <= currentDay; i++) {
        const option = document.createElement('option');
        option.value = i.toString().padStart(2, '0');
        option.textContent = i.toString();
        if (i === currentDay) {
            option.selected = true;
        }
        daySelect.appendChild(option);
    }

    container.appendChild(label);
    container.appendChild(daySelect);
    
    return {
        container,
        getMonth: () => currentMonth.toString().padStart(2, '0'),
        getDay: () => daySelect.value
    };
}