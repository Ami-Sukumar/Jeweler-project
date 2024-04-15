const mongoose = require("mongoose");

// Connect to the first database (Login)
mongoose
  .connect("mongodb://localhost:27017/Login")
  .then(() => {
    console.log("First MongoDB connected");
  })
  .catch(() => {
    console.log("Failed to connect to the first MongoDB");
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
const Collection = mongoose.model("Collection1", LogInSchema);

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
const UserInfoModel = userInfoDBConnection.model("Collection2", userInfoSchema);

// Export the model for the second database
module.exports.UserInfoModel = UserInfoModel;
