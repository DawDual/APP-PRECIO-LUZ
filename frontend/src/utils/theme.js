export const isDarkMode = () => document.body.getAttribute('data-theme') === 'dark';

export const toggleTheme = (element) => {
    const darkMode = isDarkMode();
    document.body.style.backgroundColor = darkMode ? 'white' : 'black';
    document.body.style.color = darkMode ? 'black' : 'white';
    darkMode ? document.body.removeAttribute('data-theme') : document.body.setAttribute('data-theme', 'dark');
}; 