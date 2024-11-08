const express = require('express');
const Conversation = require('../models/Conversation');
const { getMessagesByConversation,addMessage, getConversationsByUserId } = require('../controllers/conversationController');
const { getCurrentUser } = require('../controllers/authController');

const router = express.Router();

router.get('/', async (req, res) => {
    const userId = getCurrentUser(req);
    const conversations = await getConversationsByUserId(userId);
    res.render('mes-conversations', { conversations });
});

router.get('/:conversationId', async (req, res) => {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId).populate('participants');
    const destinataire = conversation.participants[1].username
    const messages = await getMessagesByConversation(conversationId);

    res.render('conversation', { conversation, messages, destinataire });
});

router.get('/:conversationId/messages', getMessagesByConversation);

router.post('/:conversationId/messages', addMessage);



module.exports = router;