/*const sequelize = require('../config/db')
const DataTypes = require('sequelize');


const Entrega = sequelize.define('Entrega', {
  id_entrega: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  id_veiculo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nome_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  situacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_entrega: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hora_entrega: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  observacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vendedor: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

  module.exports = Entrega;*/
  const mongoose = require('mongoose');

const entregaSchema = new mongoose.Schema({
  id_entrega: {
    type: Number,
    required: true,
    unique: true
  },
  id_veiculo: {
    type: Number,
    required: true
  },
  nome_cliente: {
    type: String,
    required: true,
  },
  bairro: {
    type: String,
    required: true,
  },
  situacao: {
    type: String,
    required: true,
  },
  data_entrega: {
    type: String,
    required: true,
  },
  hora_entrega: {
    type: String,
    required: true,
  },
  observacao: {
    type: String,
    required: false,
  },
  vendedor: {
    type: String,
    required: true,
  }
});

const Entrega = mongoose.model('Entrega', entregaSchema);

module.exports = Entrega;