const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

// Import mongoose
const mongoose = require("mongoose");
const { Collection, UserInfoModel } = require("./mongodb");

// Define the path to your public directory
const publicDirectoryPath = path.join(__dirname, "../public");
// path for templating
const templatePath = path.join(__dirname, '../templates')

// Serve static files from the public directory
app.use(express.static(publicDirectoryPath));

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

// Define route to render login page
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/login", (req, res) => {
    res.render("login");
});

// Define route to render user info page
app.get("/info", (req, res) => {
    res.render("info");
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
        
        // Find the user account from the second database
        const user = await UserInfoModel.findOne({ username });
        console.log("User found:", user); // Log the user details
        
        // Find and delete the user account from the first database
        const deletedUser = await Collection.findOneAndDelete({ username });

        // Find and delete the user account from the second database
        const deletedUserInfo = await UserInfoModel.findOneAndDelete({ username });

        if (deletedUser && deletedUserInfo) {
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
app.post("/userinfo", async (req, res) => {
    try {
        const userInfo = {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            gender: req.body.gender,
            username: req.body.username
        };

        await UserInfoModel.insertMany([userInfo]);

        // Redirect to successful page after saving
        res.redirect("/successful");
    } catch (error) {
        console.error("Error:", error);
        res.send("An error occurred while saving user information");
    }
});


// Define route to render the successful page
app.get("/successful", (req, res) => {
    res.render("successful");
});

// Define route to render user profile page
app.get("/profile", async (req, res) => {
    try {
        // Assuming there is a username stored in session or passed in query parameter
        const username = req.query.username;
        
        // Fetch user data from the UserInfoModel based on the username
        const user = await UserInfoModel.findOne({ username });
        
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
