export const createFooter = () => {
    const developers = {
        github: [
            'vicrii',
            'pacopedrosa',
            'saulrosua8',
            'elangelsp'
        ]
    };

    const footer = document.createElement('footer');
    footer.classList.add('footer');
    
    footer.innerHTML = `
        <div class="footer-content">
            <p>Desarrollado por:</p>
            <div class="github-users">
                ${developers.github.map(user => `
                    <a href="https://github.com/${user}" target="_blank" rel="noopener noreferrer">
                        <img src="https://github.com/${user}.png" alt="${user}" class="github-avatar">
                        <span>@${user}</span>
                    </a>
                `).join('')}
            </div>
        </div>
    `;

    return footer;
}; 