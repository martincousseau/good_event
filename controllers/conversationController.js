const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { getCurrentUser } = require('./authController');

async function createConversation(req, res) {
    const user1 = getCurrentUser(req);
    const { title, user2Id, initialMessage } = req.body;

    try {
        const conversation = new Conversation({ 
            title, 
            participants: [user1._id, user2Id] 
        });
        await conversation.save();

        const message = new Message({
            content: initialMessage,
            sender_id: user1._id,
            conversation_id: conversation._id
        });
        await message.save();

        res.redirect(`/conversation/${conversation._id}`);
    } catch (error) {
        console.error("Erreur lors de la création de la conversation:", error);
        res.status(500).send("Erreur interne lors de la création de la conversation.");
    }
}

async function getMessagesByConversation(conversationId) {
    try {
        const messages = await Message.find({ conversation_id: conversationId })
            .populate('sender_id', 'username')
            .sort({ sent_at: 1 });
        return messages;
    } catch (error) {
        console.error("Erreur lors de la récupération des messages:", error);
        throw new Error("Erreur interne lors de la récupération des messages.");
    }
}

async function addMessage(req, res) {
    const { conversationId } = req.params;
    const { content } = req.body;
    const user = getCurrentUser(req);

    try {
        const message = new Message({
            content,
            sender_id: user._id,
            conversation_id: conversationId
        });
        await message.save();
        res.status(201).send(message);
    } catch (error) {
        console.error("Erreur lors de l'ajout du message:", error);
        res.status(500).send("Erreur interne lors de l'ajout du message.");
    }
}

async function getConversationsByUserId(userId) {
    try {
        const conversations = await Conversation.find({
            participants: userId
        }).exec();

        return conversations.length > 0 ? conversations : null;
    } catch (error) {
        console.error("Erreur lors de la récupération des conversations par utilisateur:", error);
        throw new Error("Erreur interne du serveur lors de la récupération des conversations par utilisateur.");
    }
}


module.exports = { createConversation, getMessagesByConversation, addMessage, getConversationsByUserId };