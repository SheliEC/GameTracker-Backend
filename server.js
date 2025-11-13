// Archivo: backend/server.js (ACTUALIZADO)

// Cargar variables de entorno
require('dotenv').config();

// Importar módulos
const express = require('express');
const mongoose = require('mongoose');
const gameRoutes = require('./routes/games'); // <-- IMPORTACIÓN DE RUTAS

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 4000;

// MIDDLEWARE
app.use(express.json()); // <-- Esencial: Permite que Express lea JSON en las solicitudes POST/PATCH

// LOGGING (opcional, pero útil)
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

// RUTAS
app.use('/api/games', gameRoutes); // <-- CONEXIÓN DE LAS RUTAS

// Función de Conexión a MongoDB Atlas (Sin cambios)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Atlas conectado con éxito.');
        
        // Iniciar el servidor SOLO si la DB está conectada
        app.listen(PORT, () => {
            console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
        });
        
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error.message);
        process.exit(1); 
    }
};

// Iniciar la conexión
connectDB();