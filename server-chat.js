const express = require('express'); 
const socketIo = require('socket.io');
const http = require('http');
const { Message } = require('./models/Message');
const app = express();

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('Utilisateur connecté');

    socket.on('sendMessage', async (data) => {
        try {
            const { conversationId, content, senderId } = data;
            const message = new Message({
                content,
                sender_id: senderId,
                conversation_id: conversationId
            });
            await message.save();

            io.to(conversationId).emit('newMessage', message);
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message:', error);
        }
    });

    socket.on('joinConversation', (conversationId) => {
        socket.join(conversationId);
        console.log(`Utilisateur a rejoint la conversation ${conversationId}`);
    });

    socket.on('disconnect', () => {
        console.log('Utilisateur déconnecté');
    });
});

server.listen(4000, () => {
    console.log('Serveur démarré sur le port 4000');
});
