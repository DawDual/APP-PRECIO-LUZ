export function createButton () {
    const button = document.createElement("button");
    button.id = "load-prices-btn";
    button.classList.add("load-btn");
    button.textContent = "Boton para cargar";
    return button;
}