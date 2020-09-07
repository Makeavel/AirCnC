const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);


mongoose.connect(
{
    useNewUrlParser : true,
    useUnifiedTopology: true,
})

const connectedUsers = {};

io.on('connection' , socket => {
    const {user_id} = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});


app.use((req , res , next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors()); // dentro do cors { aqui } dá para por qual link pode acessar o back.
app.use(express.json());
app.use('/files' , express.static(path.resolve(__dirname, '..' , 'uploads')));
app.use(routes);


server.listen(2020); 
