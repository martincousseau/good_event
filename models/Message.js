const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    sent_at: { type: Date, default: Date.now },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true } 
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
