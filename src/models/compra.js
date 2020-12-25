const mongoose = require('mongoose');
const { Schema } = mongoose;

const compraSchema = new Schema({
    id_usuario: { type: String, required: true },
    id_producto: { type: String,required: true },
    categoria: { type: String, required: true },
    cantidad_comprada: { type: Number, required: true },
    fechaCompra: { type: Date, default: Date(Date.now()) },
    estado: { type: String, default: 'Preparando' }
});

module.exports = mongoose.model('Compra', compraSchema);