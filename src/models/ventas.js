const mongoose = require('mongoose');
const { Schema } = mongoose;

const Ventas = new Schema({
    codFact: { type: String, required: true },
    idCli: { type: String, required: true },
    idProd: { type: String, required: true },
    cantComp: { type: String, required: true },
    valor: { type: Number, required: true },
    estado: { type: String, required: true },
    fechaCompra: { type: Date, default: Date(Date.now()) },
    departamento: { type: String, required: true},
    municipio: { type: String, required: true},
    direccion: { type: String, required: true}    
}, {
    collection: 'ventas'
});

module.exports = mongoose.model('Venta', Ventas);