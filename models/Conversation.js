const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    created_at: { type: Date, default: Date.now }
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
