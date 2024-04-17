// Array of colors
const colors = ['black', 'grey', 'white', 'pink', 'orange'];

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create and display colored divs
function createColoredDivs() {
 const outputDiv = document.getElementById('output');
 outputDiv.innerHTML = ''; // Clear previous content

 for (let i = 0; i < 5; i++) { // Loop to create 5 colored divs
   const div = document.createElement('div');
   div.style.width = '300px';
   div.style.height = '20px';
   div.style.backgroundColor = colors[getRandomNumber(0, colors.length - 1)];
   div.style.borderRadius = '20%'; // Make the divs round
   outputDiv.appendChild(div);
 }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", function() {
   createColoredDivs();
});

