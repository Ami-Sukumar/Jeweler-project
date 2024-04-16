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

    _id: {
    type: mongoose.Schema.Types.ObjectId,
  },

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

  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
  },


});

// Create model for the first database
const Collection = mongoose.model("collection1", LogInSchema);

// Export the model for the first database
module.exports.Collection = Collection;
module.exports.LogInSchema = LogInSchema;
