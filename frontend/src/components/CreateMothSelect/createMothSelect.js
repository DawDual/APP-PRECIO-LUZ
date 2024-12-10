const month = import.meta.env.VITE_MONTH_RANGES;

export function createMonthSelect() {
    const franjas= month.split(",");
    const select= document.createElement("select");
    franjas.forEach(franja => {
        const option = document.createElement("option");
        option.value = franja;
        option.textContent = franja;
        select.appendChild(option);
    });
    return select;
}