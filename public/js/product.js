document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('productName');

    function fetchProductData(productName) {
        fetch('/data/product.json')
            .then(response => response.json())
            .then(products => {
                const product = products.find(p => p.name.toLowerCase() === productName);
                if (product) {
                    document.querySelector('.app-title').textContent = product.name;
                    document.querySelector('.short-description').textContent = product.description;
                    document.querySelector('.version').textContent = 'Version: ' + product.version;
                    document.getElementById('productImage').src = product.image;
                    document.getElementById('websiteLink').href = product.website;
                    document.getElementById('websiteLink').textContent = product.website;
                    document.getElementById('contactEmail').textContent = product.contact;
                } else {
                    console.error('Product not found:', productName);
                }
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }

    fetchProductData(productName);
});

// search.js
console.log('product script is running!');