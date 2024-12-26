const express = require('express');
const app = express();
const usersRoutes = require('../server/routes/user')
const entregasRoutes = require('../server/routes/entregas')
const connectDB = require('./config/db')
const path = require('path');

app.use(express.static(path.join(__dirname, '../build')));

// Rota de fallback para servir o React App em qualquer rota não definida
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Servidor rodando`);});
module.exports = app