// Archivo: backend/controllers/gameController.js

const Game = require('../models/Game');

// 1. OBTENER TODOS LOS JUEGOS (READ ALL)
const getAllGames = async (req, res) => {
    try {
        const games = await Game.find({}).sort({ createdAt: -1 });
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los juegos.' });
    }
};

// 2. CREAR UN NUEVO JUEGO (CREATE)
const createGame = async (req, res) => {
    const { title, platform, isCompleted, hoursPlayed, rating, review, category, coverImage } = req.body;

    if (!title || !platform) {
        return res.status(400).json({ error: 'El título y la plataforma son campos obligatorios.' });
    }

    try {
        const newGame = await Game.create({ title, platform, isCompleted, hoursPlayed, rating, review, category, coverImage });
        res.status(201).json(newGame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 3. OBTENER UN SOLO JUEGO (READ ONE)
const getGame = async (req, res) => {
    const { id } = req.params;

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
            req.body,
            { new: true, runValidators: true }
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

        res.status(200).json(deletedGame);

    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el juego.' });
    }
};

// -------------------------------
//  🔵 NUEVAS FUNCIONES
// -------------------------------

// LIKE RESEÑA
const likeReview = async (req, res) => {
    const { id } = req.params;

    try {
        const game = await Game.findById(id);
        if (!game) return res.status(404).json({ error: "Juego no encontrado" });

        // Si NO está likeado → dar like
        if (!game.liked) {
            game.liked = true;
            game.likesCount = 1;
        } else {
            // Si YA está likeado → quitar like
            game.liked = false;
            game.likesCount = 0;
        }

        await game.save();
        res.status(200).json(game);

    } catch (error) {
        res.status(500).json({ error: "Error al dar like" });
    }
};


// AGREGAR COMENTARIO
const addComment = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "El comentario no puede estar vacío" });
    }

    try {
        const game = await Game.findById(id);
        if (!game) return res.status(404).json({ error: "Juego no encontrado" });

        game.comments.push({ text });
        await game.save();

        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar comentario" });
    }
};

// EDITAR COMENTARIO
const editComment = async (req, res) => {
    const { id, commentId } = req.params;
    const { text } = req.body;

    try {
        const game = await Game.findById(id);
        if (!game) return res.status(404).json({ error: "Juego no encontrado" });

        const comment = game.comments.id(commentId);
        if (!comment) return res.status(404).json({ error: "Comentario no encontrado" });

        comment.text = text;
        await game.save();

        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ error: "Error al editar comentario" });
    }
};

// ELIMINAR COMENTARIO
const deleteComment = async (req, res) => {
    const { id, commentId } = req.params;

    try {
        const game = await Game.findById(id);
        if (!game) return res.status(404).json({ error: "Juego no encontrado" });

        game.comments.id(commentId).deleteOne();
        await game.save();

        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar comentario" });
    }
};

// -------------------------------
// 🔴 EXPORTAR TODAS LAS FUNCIONES
// -------------------------------
module.exports = {
    getAllGames,
    createGame,
    getGame,
    updateGame,
    deleteGame,
    likeReview,
    addComment,
    editComment,
    deleteComment
};
