const hours= import.meta.env.VITE_HOUR_RANGES
export function createSelect() {
    const container = document.createElement('div');
    container.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    const label = document.createElement('label');
    label.textContent = 'Rango horario:';
    label.style.fontWeight = 'bold';

    const select = document.createElement('select');
    select.style.padding = '8px';
    select.style.borderRadius = '4px';
    select.style.border = '1px solid var(--border-color)';

    // Generar opciones para rangos de 6 horas
    const ranges = [
        { start: "00", end: "06" },
        { start: "06", end: "12" },
        { start: "12", end: "18" },
        { start: "18", end: "24" }
    ];

    ranges.forEach(range => {
        const option = document.createElement('option');
        option.value = range.start;
        option.textContent = `${range.start}:00 - ${range.end}:00`;
        select.appendChild(option);
    });

    container.appendChild(label);
    container.appendChild(select);
    return container;
}


// const button = document.createElement("button");
// button.id = "load-prices-btn";
// button.classList.add("load-btn");
// button.textContent = "Boton para cargar";
// return button;
