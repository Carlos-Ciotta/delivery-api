/*const Sequelize = require('sequelize');

const sequelize = new Sequelize('mongodb+srv://carloseduardociotta:mongodb159753@ciotta.am99pad.mongodb.net/?retryWrites=true&w=majority');

sequelize
    .authenticate()
    .then(() => console.log('Authenticated'))
    .catch(() => console.log('Error Auth'));

sequelize.sync();

module.exports = sequelize;*/

const mongoose = require('mongoose');

const uri = 'mongodb+srv://ndstr:<password>@cluster0.pfyukxj.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose.connection;
