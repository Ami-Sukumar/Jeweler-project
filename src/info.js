// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault();

    // Retrieve form data
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const gender = document.getElementById('gender').value;

    // Validate age
    if (isNaN(age) || age < 0 || age > 150) {
        document.getElementById('message').textContent = 'Please enter a valid age.';
        return;
    }

    // Store user information in an object
    const userInfo = {
        name: name,
        age: age,
        email: email,
        address: address,
        phone: phone,
        gender: gender
    };

    // Display user information
    displayUserInfo(userInfo);
}

// Function to display user information
function displayUserInfo(user) {
    let message = `User Information:\n`;
    for (const [key, value] of Object.entries(user)) {
        message += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
    }

    // Conditional to check if age is greater than or equal to 18
    if (user.age >= 18) {
        message += 'You are an adult.';
    } else {
        message += 'You are a minor.';
    }

    document.getElementById('message').textContent = message;
}

// Event listener for form submission
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('userInfoForm');
    form.addEventListener('submit', handleSubmit);
});

// Call the connectToMongoDB function
connectToMongoDB()
    .then(async (collection) => {
        // Example of using the MongoDB collection
        const users = await collection.find({}).toArray();
        await processUsers(users);
    })
    .catch(error => {
        console.error('Error:', error);
    });

