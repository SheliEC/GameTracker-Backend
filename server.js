// Cargar variables de entorno del archivo .env
require('dotenv').config();

// Importar módulos
const express = require('express'); 
const mongoose = require('mongoose');

// Inicializar la aplicación Express
const app = express();

// Definir el Puerto
const PORT = process.env.PORT || 4000;

// Función de Conexión a MongoDB Atlas
const connectDB = async () => {
    try {
        // Conectar usando la URL de .env
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Atlas conectado con éxito.');
        
        // Iniciar el servidor SOLO si la DB está conectada
        app.listen(PORT, () => {
            console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
        });
        
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error.message);
        // Salir si falla la conexión a DB
        process.exit(1); 
    }
};

// Iniciar la conexión y el servidor
connectDB();

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.send('API de GameTracker está funcionando.');
});