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
    spinner.style.display = 'none';
    spinner.innerHTML = '<div class="spinner-circle"></div>';
    return spinner;
};

export function showSpinner() {
    const spinner = document.getElementById("spinner");
    if (spinner) spinner.style.display = "block"; 
}

export function hideSpinner() {
    const spinner = document.getElementById("spinner");
    if (spinner) spinner.style.display = "none";
}

