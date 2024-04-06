const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {})
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
    });
};

module.exports = connectDB;