
export const createToggleButton = () => {
    const app = document.getElementById('app');
    const button = document.createElement('button');
    button.textContent = 'Modo oscuro';
    button.id = 'toggle-button';
    button.style.padding = '7px';
    button.style.marginLeft = '80%';
    app.appendChild(button);
    }
    
    export const showButton = () => {
        const button = document.getElementById('toggle-button');
        button.addEventListener('click', () => {
            if(document.body.style.backgroundColor == 'white'){
                document.body.style.backgroundColor = 'black';
                document.body.style.color = 'white';
                button.textContent = 'Modo claro';
            }else{
                document.body.style.backgroundColor = 'white';
                document.body.style.color = 'black';
                button.textContent = 'Modo oscuro';
            }
        })
    }