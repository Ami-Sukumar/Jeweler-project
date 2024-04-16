// // const mongoose = require("mongoose");

// // mongoose
// //   .connect("mongodb://localhost:27017/Login")
// //   .then(() => {
// //     console.log("mongodb connected");
// //   })
// //   .catch(() => {
// //     console.log("failed to connect");
// //   });

// // const LogInSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true,
// //   },

// //     username: {
// //     type: String,
// //     required: true,
// //   },

// //   password: {
// //     type: String,
// //     required: true,
// //   },
// // });



// // Define route to render Signup page
// app.get("/signup",(req,res)=>{
//     res.render("signup");
// })

// app.post("/signup",async(req,res)=>{

// const data={
//     name:req.body.name,
//     username:req.body.username,
//     password:req.body.password
// }

// await Collection.insertMany([data])

// res.render("home")

// })

// // Define route to render info page
// app.get("/info",(req,res)=>{
//     res.render("info");
// })
// app.post("/info" , async(req,res)=> {

// const userInfo = {
//       name: req.body.name,
//       age: req.body.age,
//       email: req.body.email,
//       address: req.body.address,
//       phone: req.body.phone,
//       gender: req.body.gender,
//       username: req.body.username,  
// }  

// await  UserInfoModel.insertMany([userInfo])

// })

// // Example route to handle inserting user info into the second database
// app.post("/userinfo", async (req, res) => {
//   try {

//     // Create a new instance of the UserInfoModel with data from the request body
//     const userInfo = new UserInfoModel({
//       name: req.body.name,
//       age: req.body.age,
//       email: req.body.email,
//       address: req.body.address,
//       phone: req.body.phone,
//       gender: req.body.gender,
//       username: req.body.username, 
//     });

//     // Save the user info to the second database
//     const savedUserInfo = await userInfo.save();
//     console.log("Saved user information:", savedUserInfo); // Log saved user information

//     // Redirect to profile page or any other page as needed
//     res.redirect("/successful");
//   } catch (error) {
//     console.error("Error:", error);
//     res.send("An error occurred while saving user information");
//   }
// });


// // Define route to render the successful page
// app.get("/successful", (req, res) => {
//   res.render("successful");
// });

// app.listen(3000,()=>{
//     console.log("port connected");
// })