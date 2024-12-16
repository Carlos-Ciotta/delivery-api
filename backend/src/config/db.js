const mongoose = require('mongoose');

const uri = 'mongodb+srv://ndstr:<password>@cluster0.pfyukxj.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose.connection;
