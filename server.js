// Archivo: backend/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // <<< LÍNEA A AGREGAR (5)

const gameRoutes = require('./routes/games'); // IMPO RTACIÓN DE RUTAS

const app = express();

// MIDDLEWARE
app.use(express.json()); // Permite a la app usar JSON
app.use(cors()); // <<< LÍNEA A AGREGAR (14): Aquí se habilita CORS

// LOGGING (opcional, pero útil)
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

// RUTAS
app.use('/api/games', gameRoutes); // CONEXIÓN DE LAS RUTAS

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Escucha en el puerto
    app.listen(process.env.PORT, () => {
      console.log('✅ MongoDB Atlas conectado con éxito.');
      console.log(`📡 Servidor corriendo en puerto: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log('❌ Error al conectar a MongoDB:', error);
  });

// Iniciar la conexión
connectDB();