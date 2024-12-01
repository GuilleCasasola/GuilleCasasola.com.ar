const words = document.querySelector('.blog-content').innerText.split(' ').length;
const readingTime = Math.ceil(words / 200); // Promedio: 200 palabras/minuto
document.querySelector('.reading-time').innerText = `${readingTime}`;