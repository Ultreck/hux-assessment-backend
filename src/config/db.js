const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then((response) => {
        console.log('MongoDB successfully connected');
    })
    .catch((error) => {
        console.log(error);
        
    });
};

module.exports = connectDB;
