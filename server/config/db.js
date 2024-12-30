require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async() => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
      
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

module.exports = connectDB