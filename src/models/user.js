const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    fechaRegistro: { type: Date, default: Date(Date.now())}
});

module.exports = mongoose.model('User', userSchema);