// Archivo: backend/models/Game.js

const mongoose = require('mongoose');

// Definición del Schema (la estructura de datos)
const GameSchema = new mongoose.Schema({
    // Requisito: Título del juego (obligatorio)
    title: {
        type: String,
        required: true,
        trim: true, // Elimina espacios en blanco al inicio/final
        unique: true // No puede haber dos juegos con el mismo título
    },
    // Requisito: Plataforma o sistema
    platform: {
        type: String,
        required: true
    },
    // Requisito: Marcar como completado
    isCompleted: {
        type: Boolean,
        default: false
    },
    // Requisito: Registrar horas jugadas (mínimo 0)
    hoursPlayed: {
        type: Number,
        default: 0,
        min: 0
    },
    // Requisito: Puntuación (1 a 5 estrellas)
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    // Requisito: Escribir reseña detallada (texto libre)
    review: {
        type: String,
        trim: true,
        default: ''
    }
}, {
    // Agrega campos automáticos para cuándo fue creado/actualizado
    timestamps: true 
});

// Exportar el modelo para usarlo en otras partes de la app
module.exports = mongoose.model('Game', GameSchema); 