// Archivo: backend/routes/games.js

const express = require('express');
const {
    getAllGames,
    createGame,
    getGame,
    updateGame,
    deleteGame,
    likeReview,
    addComment,
    editComment,
    deleteComment
} = require('../controllers/gameController');

const router = express.Router();

// CRUD PRINCIPAL
router.get('/', getAllGames);
router.post('/', createGame);
router.get('/:id', getGame);
router.patch('/:id', updateGame);
router.delete('/:id', deleteGame);

// ----------------------
// 🔵 RUTAS NUEVAS
// ----------------------
router.patch('/:id/like', likeReview);
router.post('/:id/comment', addComment);
router.patch('/:id/comment/:commentId', editComment);
router.delete('/:id/comment/:commentId', deleteComment);

module.exports = router;


