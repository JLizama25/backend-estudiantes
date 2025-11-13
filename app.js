require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const app = express();
 
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use((req, res, next) => {
  // Solo sanea el body y params manualmente
  mongoSanitize.sanitize(req.body);
  mongoSanitize.sanitize(req.params);
  mongoSanitize.sanitize(req.query);
  next();
});
app.use(session({
  secret: 'clave_secreta',
  resave: false,
  saveUninitialized: true
}));
 app.get("/", (req, res) => {
  res.send("API de Estudiantes funcionando 🎉");
});
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ Error: MONGO_URI no está definida");
  process.exit(1); // Detiene la app si no hay URI
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.error("❌ Error al conectar MongoDB:", err));
 
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/estudiantes', require('./routes/estudiantesRoutes'));
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});