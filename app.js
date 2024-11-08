const morgan = require('morgan');
const express = require('express');
const path = require('path');
const session = require("express-session");
const {mongoose} = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Import routers
const indexRouter = require("./routes/index.js");
const authRouter = require("./routes/auth.js");
const homeRouter = require("./routes/home.js");
const accountRouter = require("./routes/account.js");
const loginRouter = require("./routes/login.js");
const logoutRouter = require("./routes/logout.js");
const eventRouter = require("./routes/event.js");
const editEventRouter = require("./routes/edit-event.js");
const favoriseEventRouter = require('./routes/favorise-event');
const createConversationRouter = require('./routes/create-conversation.js');
const conversationRouter = require('./routes/conversation.js');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'top secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Connect to the DB 
mongoose.connect('mongodb://localhost:27017/projet_test', {
}).then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion MongoDB:', err));

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/home', homeRouter);
app.use('/account', accountRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/event', eventRouter);
app.use('/edit-event', editEventRouter);
app.use('/favorise-event', favoriseEventRouter);
app.use('/create-conversation', createConversationRouter);
app.use('/conversation', conversationRouter);

// Sockets
const server = http.createServer(app);
const io = socketIo(server);

// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
