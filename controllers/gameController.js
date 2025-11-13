// Archivo: backend/controllers/gameController.js

const Game = require('../models/Game');

// 1. OBTENER TODOS LOS JUEGOS (READ ALL)
const getAllGames = async (req, res) => {
    try {
        const games = await Game.find({}).sort({ createdAt: -1 }); // Obtener y ordenar por fecha de creación
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los juegos.' });
    }
};

// 2. CREAR UN NUEVO JUEGO (CREATE)
const createGame = async (req, res) => {
    // Los datos del juego vienen en el cuerpo de la solicitud (req.body)
    const { title, platform, isCompleted, hoursPlayed, rating, review } = req.body;

    // Validación básica: El título y la plataforma son obligatorios
    if (!title || !platform) {
        return res.status(400).json({ error: 'El título y la plataforma son campos obligatorios.' });
    }

    try {
        const newGame = await Game.create({ title, platform, isCompleted, hoursPlayed, rating, review });
        res.status(201).json(newGame); // 201 Created
    } catch (error) {
        // Error de Mongoose (ej: título duplicado, validación fallida)
        res.status(400).json({ error: error.message }); 
    }
};

// 3. OBTENER UN SOLO JUEGO (READ ONE)
const getGame = async (req, res) => {
    const { id } = req.params; // Obtener el ID del juego desde la URL

    try {
        const game = await Game.findById(id);

        if (!game) {
            return res.status(404).json({ error: 'Juego no encontrado.' });
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ error: 'ID de juego no válido.' });
    }
};

// 4. ACTUALIZAR UN JUEGO (UPDATE)
const updateGame = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedGame = await Game.findByIdAndUpdate(
            id, 
            req.body, // Aplica todos los datos que vienen en el cuerpo
            { new: true, runValidators: true } // new: true devuelve el documento actualizado; runValidators: true asegura validación
        );

        if (!updatedGame) {
            return res.status(404).json({ error: 'Juego no encontrado para actualizar.' });
        }

        res.status(200).json(updatedGame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 5. ELIMINAR UN JUEGO (DELETE)
const deleteGame = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedGame = await Game.findByIdAndDelete(id);

        if (!deletedGame) {
            return res.status(404).json({ error: 'Juego no encontrado para eliminar.' });
        }

        res.status(200).json({ message: 'Juego eliminado con éxito.', deletedGame });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el juego.' });
    }
};

// Exportar las funciones para usarlas en las rutas
module.exports = {
    getAllGames,
    createGame,
    getGame,
    updateGame,
    deleteGame
}; 