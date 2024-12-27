const mongoose = require('mongoose');

const entregaSchema = new mongoose.Schema({
  id_entrega: {
    type: Number,
    required: true,
    unique: true,
    _id: true  
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
  periodo_entrega: {
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

const Entrega = mongoose.model('Entrega', entregaSchema, 'CiottaCloud');

module.exports = Entrega;