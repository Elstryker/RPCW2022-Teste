const mongoose = require('mongoose')

var ligacaoSchema = new mongoose.Schema({
    id : String,
    origem : String,
    destino : String,
    distancia: Number
  }, {versionKey : false});

module.exports = mongoose.model('ligacao', ligacaoSchema, 'ligacoes')