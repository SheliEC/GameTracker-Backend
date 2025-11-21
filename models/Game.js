const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    title: { type: String, required: true, trim: true, unique: true },

    platform: { type: String, required: true },

    isCompleted: { type: Boolean, default: false },

    hoursPlayed: { type: Number, default: 0, min: 0 },

    rating: { type: Number, min: 1, max: 10, default: 1 },

    review: { type: String, trim: true, default: "" },

    category: { type: String, trim: true, default: "" },

    coverImage: { type: String, default: "" },

    // 🔵 NUEVOS CAMPOS
    liked: {
    type: Boolean,
    default: false
},
likesCount: {
    type: Number,
    default: 0
}, 


    comments: [
        {
            text: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ]

}, { timestamps: true });

module.exports = mongoose.model('Game', GameSchema);
 