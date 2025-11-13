// Archivo: backend/routes/games.js

const express = require('express');
const {
    getAllGames,
    createGame,
    getGame,
    updateGame,
    deleteGame
} = require('../controllers/gameController'); // Importa todas las funciones CRUD

const router = express.Router();

// GET /api/games -> OBTENER todos los juegos
router.get('/', getAllGames);

// POST /api/games -> CREAR un nuevo juego
router.post('/', createGame);

// GET /api/games/:id -> OBTENER un juego por ID
router.get('/:id', getGame);

// PATCH /api/games/:id -> ACTUALIZAR un juego por ID
router.patch('/:id', updateGame);

// DELETE /api/games/:id -> ELIMINAR un juego por ID
router.delete('/:id', deleteGame);

module.exports = router;