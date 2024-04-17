// Array of colors
const colors = ['orange', 'red', 'white', 'pink', 'orange'];

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to change the color of the h1 element
function changeH1Color() {
    const h1Element = document.querySelector('h1');
    h1Element.style.color = colors[getRandomNumber(0, colors.length - 1)];
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", function() {
    changeH1Color();
});

