const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  carrera: { type: String, required: true, trim: true },
  edad: { type: Number, required: true, min: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Estudiante', estudianteSchema);