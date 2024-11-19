import { createSelect } from "./components/createHoursSelect/createHoursSelect";
import { createButton } from "./components/loadButton/loadButton";
import { createSpinner } from "./components/spinner/spinner";

function handleClick() {
    loadDataPerHour(hour) 
}

document.addEventListener("DOMContentLoaded", () => {
    const app= document.getElementById("app");
    const spinner= createSpinner();
    // app.appendChild(spinner);
    const loadPricesButton= createButton();
    app.appendChild(loadPricesButton);
    loadPricesButton.addEventListener("click" , handleClick);
    const selectHours= createSelect();
    console.log(selectHours);
    app.appendChild(selectHours);
    
});