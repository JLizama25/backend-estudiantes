const Estudiante = require('../models/Estudiante');

// GET: Listar todos los estudiantes (omitiendo registros vacíos)
exports.listar = async (req, res) => {
  try {
    // Buscar solo documentos con nombre y carrera definidos
    const lista = await Estudiante.find({
      nombre: { $exists: true, $ne: "" },
      carrera: { $exists: true, $ne: "" },
      edad: { $exists: true, $ne: null }
    });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener estudiantes', error });
  }
};

// POST: Crear un nuevo estudiante (validando campos requeridos)
exports.crear = async (req, res) => {
  try {
    const { nombre, carrera, edad } = req.body;

    // Validaciones básicas
    if (!nombre || !carrera || !edad) {
      return res.status(400).json({
        mensaje: 'Todos los campos (nombre, carrera, edad) son obligatorios.'
      });
    }

    // Evitar edad negativa o no numérica
    if (typeof edad !== 'number' || edad <= 0) {
      return res.status(400).json({ mensaje: 'Edad debe ser un número positivo.' });
    }

    const estudiante = new Estudiante({ nombre, carrera, edad });
    await estudiante.save();
    res.status(201).json(estudiante);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear estudiante', error });
  }
};

// PUT: Actualizar un estudiante por ID
exports.actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, carrera, edad } = req.body;

    // Validación básica
    if (!nombre && !carrera && !edad) {
      return res.status(400).json({
        mensaje: 'Debe proporcionar al menos un campo a actualizar.'
      });
    }

    const estudianteActualizado = await Estudiante.findByIdAndUpdate(
      id,
      { nombre, carrera, edad },
      { new: true }
    );

    if (!estudianteActualizado)
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });

    res.json(estudianteActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar estudiante', error });
  }
};

// DELETE: Eliminar un estudiante por ID
exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Estudiante.findByIdAndDelete(id);
    if (!eliminado)
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });

    res.json({ mensaje: 'Estudiante eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar estudiante', error });
  }
};
