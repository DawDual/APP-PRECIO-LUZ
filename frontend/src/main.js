import { createSelect } from "./components/createHoursSelect/createHoursSelect";
import { createButton } from "./components/loadButton/loadButton";
import { createSpinner } from "./components/spinner/spinner";


const renderLogin = () =>{
    
    const app = document.getElementById("app");

    const h1 = document.createElement("h1");
    h1.textContent = "LOGIN";
    app.appendChild(h1);
    
    app.innerHTML += `
    <div class="login-container">
        <h2>Iniciar Sesión</h2>
        <form id="form-login">
            <input type="text" id="username" name="username" placeholder="Nombre de usuario" required>
            <input type="password" id="password" name="password" placeholder="Contraseña" required>
            <button type="submit">Entrar</button>
        </form>
        <a href="register.html">Registrarse</a>
    </div>`
    ;

    document.getElementById("form-producto")
    .addEventListener("submit", sendLogin);


    

}

const sendLogin = (event) => {
    //no recargar paginas
    event.preventDefault();
    event.target.reset();

}






renderLogin();




















// function handleClick() {
//     loadDataPerHour(hour) 
// }

// document.addEventListener("DOMContentLoaded", () => {
//     const app= document.getElementById("app");
//     const spinner= createSpinner();
//     // app.appendChild(spinner);
//     const loadPricesButton= createButton();
//     app.appendChild(loadPricesButton);
//     loadPricesButton.addEventListener("click" , handleClick);
//     const selectHours= createSelect();
//     console.log(selectHours);
//     app.appendChild(selectHours);
    
// });