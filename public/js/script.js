document.addEventListener("DOMContentLoaded", function() {
    const slideContainer = document.querySelector(".carousel-slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let slideIndex = 0;
    let slides; // Declare slides variable globally

    // Fetch image URLs from the server
    fetch("/images")
        .then(response => response.json())
        .then(data => {
            const images = data.images;
            // Create img elements for each image URL
            images.forEach(imageUrl => {
                const img = document.createElement("img");
                img.src = imageUrl;
                slideContainer.appendChild(img);
            });
            // Initialize carousel
            slides = document.querySelectorAll(".carousel-slide img"); // Assign value to slides
            showSlide(slideIndex);
        })
        .catch(error => {
            console.error("Error fetching images:", error);
        });

    // Function to display current slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = "none";
        });
        // Display current slide
        slides[index].style.display = "block";
    }

    // Event listener for previous button
    prevBtn.addEventListener("click", function() {
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        showSlide(slideIndex);
    });

    // Event listener for next button
    nextBtn.addEventListener("click", function() {
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        showSlide(slideIndex);
    });
});
