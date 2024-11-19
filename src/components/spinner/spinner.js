/**
 * Spinner con tres estados:
 * - Crear el spinner
 * - Mostrar el spinner
 * - Ocultar el spinner
 * @description Componente de spinner para la aplicación de precio de luz
 */
export const createSpinner = () => {
    const spinner = document.createElement('div');
    spinner.id = 'spinner';
    spinner.classList.add('hidden', 'spinner');
    spinner.textContent="Cargando";
    return spinner;
};

export function showSpinner() {
    const spinner= document.getElementById("spinner");
    spinner.classList.remove("hidden");
}
export function hideSpinner () {
    const spinner= document.getElementById("spinner");
    spinner.classList.add("hidden");
}
