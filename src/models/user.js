const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    fechaRegistro: { type: Date, default: Date(Date.now())},
    fechaNac: { type: Date },
    departamento: { type: String },
    municipio: { type: String },
    direccion: { type: String }
});

module.exports = mongoose.model('User', userSchema);