const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const hbs = require("hbs");
const fs = require("fs");


// Import mongoose
const mongoose = require("mongoose");
const { Collection } = require("./mongodb");

// Define the path to your public directory
const publicDirectoryPath = path.join(__dirname, "../public");
// Path for templating
const templatePath = path.join(__dirname, '../templates')


// Serve static files from the public directory
app.use(express.static(publicDirectoryPath));

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));


// Define the path to your images directory
const imagesDirectory = path.join(__dirname, "../public/images");

// Route for serving image URLs
app.get("/images", (req, res) => {
    // Read the list of files in the images directory
    fs.readdir(imagesDirectory, (err, files) => {
        if (err) {
            console.error("Error reading images directory:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        // Filter out non-image files (if any)
        const imageFiles = files.filter(file => {
            const fileExtension = path.extname(file).toLowerCase();
            return fileExtension === ".png" || fileExtension === ".jpg" || fileExtension === ".jpeg" || fileExtension === ".gif";
        });

        // Construct image URLs
        const imageUrls = imageFiles.map(file => `/images/${file}`);

        // Send the list of image URLs as a JSON response
        res.json({ images: imageUrls });
    });
});



// Route for rendering contact page
app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/contact.html"));
});


// Route for handling search submission
app.post('/search', (req, res) => {
    const userInput = req.body.userInput.toLowerCase();
    res.redirect(`/product?productName=${userInput}`);
});

// Route for serving product data
app.get('/product', (req, res) => {
    const productName = req.query.productName.toLowerCase();
    //const products = require('./data/product.json');
    const products = require('../public/data/product.json');
    const product = products.find(p => p.name.toLowerCase() === productName);
    if (product) {
        res.render("product", { product });
    } else {
        res.status(404).render("error", { message: "Product not found" });
    }
});

// Define route to render login page
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/login", (req, res) => {
    res.render("login");
});

// Define route to render user info page
app.get("/info", (req, res) => {
    const id = req.query.id
    res.render("info", { id });
});

// Define route to render Signup page
app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    }

    await Collection.insertMany([data])

    res.render("home");
});

app.post("/login", async (req, res) => {
    try {
        const user = await Collection.findOne({ username: req.body.name });

        if (user && user.password === req.body.password) {
            // Render profile page and pass user data
            res.render("profile", { user });
        } else {
            res.send("Incorrect username or password");
        }
    } catch (error) {
        console.error("Error:", error);
        res.send("An error occurred during login");
    }
});

app.get("/logout", (req, res) => {
    // Clear session or any authentication tokens
    // Redirect user to login page or any other page as needed
    res.redirect("/");
});

app.post("/delete-account", async (req, res) => {
    try {
        const username = req.body.username;
         
        // Find and delete the user account from the first database
        const deletedUser = await Collection.findOneAndDelete({ username });

        if (deletedUser) {
            // Both accounts were successfully deleted
            res.redirect("/");
        } else {
            // One or both of the accounts were not found
            res.redirect("/login");
        }
    } catch (error) {
        console.error("Error:", error);
        res.send("An error occurred while deleting the account");
    }
});

// Handle user info submission
app.post("/user/:id/edit", async (req, res) => {
    try {
        const newData = {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            gender: req.body.gender,
        };
        console.log(req.params.id)
        const oldData = await Collection.findById(req.params.id)
        console.log(oldData)
        oldData.overwrite({username: oldData.username, password: oldData.password, ...newData})
        await oldData.save()

        // Redirect to successful page after saving
        res.redirect(`/successful/${newData.name}`);
    } catch (error) {
        console.error("Error:", error);
        res.send("An error occurred while saving user information");
    }
});

// // route to update
// app.update("/updateuserinfo", async (req, res) => {
//     try {
//         const userInfo = {
//             // name: req.body.name,
//             age: req.body.age,
//             email: req.body.email,
//             address: req.body.address,
//             phone: req.body.phone,
//             gender: req.body.gender,
//         };

//        const res = await UserInfoModel.replaceOne({userInfo},{userInfo});

//     }});

// Define route to render the successful page
app.get("/successful/:name", (req, res) => {
    const name = req.params.name;
    res.render("successful", {name});
});

// Define route to render user profile page
app.get("/profile", async (req, res) => {
    try {
        // Assuming there is a username stored in session or passed in query parameter
        const name = req.query.name;
        
        // Fetch user data from the UserInfoModel based on the username
        const user = await Collection.findOne({ name });
        
        if (user) {
            // Render the profile page and pass user data to it
            res.render("profile", { user });
        } else {
            res.send("User not found");
        }
    } catch (error) {
        console.error("Error:", error);
        res.send("An error occurred while fetching user information");
    }
});


app.listen(3000, () => {
    console.log("port connected");
});