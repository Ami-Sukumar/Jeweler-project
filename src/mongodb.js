const mongoose = require("mongoose");

require('dotenv').config();
const mongodbPass = process.env.MONGODB
// Connect to the first database (Login)
mongoose
  .connect(`mongodb+srv://amisukumar:${mongodbPass}@cluster.st1wjdl.mongodb.net/Jeweler?retryWrites=true&w=majority&appName=Cluster`)
  .then(() => {
    console.log("First MongoDB connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Define schema for the first database
const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create model for the first database
const Collection = mongoose.model("collection1", LogInSchema);

// Export the model for the first database
module.exports.Collection = Collection;

// Connect to the second database (UserInfoDB)
const userInfoDBConnection = mongoose.createConnection("mongodb://localhost:27017/UserInfoDB");

userInfoDBConnection.once('open', () => {
  console.log('Second MongoDB connected');
});

// Define schema for the second database
const userInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

// Create model for the second database
const UserInfoModel = userInfoDBConnection.model("collection2", userInfoSchema);

// Export the model for the second database
module.exports.UserInfoModel = UserInfoModel;
