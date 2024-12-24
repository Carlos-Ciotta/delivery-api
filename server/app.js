const express = require('express');
const app = express();
const usersRoutes = require('../server/routes/user')
const entregasRoutes = require('../server/routes/entregas')
const connectDB = require('./config/db')

connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', usersRoutes); 
app.use('/', entregasRoutes)
app.use((err, res) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Erro interno do servidor';

    res.status(statusCode).json({
        message: errorMessage,
    });
});

const PORT = 3000
app.listen(process.env.PORT/*PORT*/, () => {
console.log(`Servidor rodando`);});
module.exports = app