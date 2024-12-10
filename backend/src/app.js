const express = require('express');
const app = express();
const entregasRoutes = require('../src/routes/entregas');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/index", express.static(__dirname + '/frontend'));
app.use('/', entregasRoutes); 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Erro interno do servidor';

    res.status(statusCode).json({
        message: errorMessage,
    });
});


mongoose.connect('mongodb+srv://carloseduardociotta:mongodb159753@ciotta.am99pad.mongodb.net/?retryWrites=true&w=majority&appName=ciotta')
//const PORT = 3000;
//mongoose.connect('mongodb+srv://carloseduardociotta:mongodb159753@ciotta.am99pad.mongodb.net/?retryWrites=true&w=majority')
app.listen(process.env.PORT/*PORT*/, () => {
console.log(`Servidor rodando`);});
