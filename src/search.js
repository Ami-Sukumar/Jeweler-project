// search.js

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    window.location.href = `/product?productName=${searchInput}`;
});
