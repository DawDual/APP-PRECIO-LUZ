const hours= import.meta.env.VITE_HOUR_RANGES
export function createSelect() {
    const franjas= hours.split(",");
    const select= document.createElement("select");
    franjas.forEach(franja => {
        const option = document.createElement("option");
        option.value = franja;
        option.textContent = franja;
        select.appendChild(option);
    });
    return select;
}


// const button = document.createElement("button");
// button.id = "load-prices-btn";
// button.classList.add("load-btn");
// button.textContent = "Boton para cargar";
// return button;