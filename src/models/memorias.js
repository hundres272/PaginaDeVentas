const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchemaMemorias = new Schema({
  code: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  cant: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
}, {
    collection: 'memorias'
});

module.exports = mongoose.model('Producto4', ProductoSchemaMemorias);