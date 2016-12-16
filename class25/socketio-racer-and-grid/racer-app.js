const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

const players = {player1: 100, player2: 0};
const delta = 5;

io.on('connect', (socket) => {
    console.log(socket.id, 'connected');
    socket.emit('update', players);
    // socket.emit('initialBoard', board);

    socket.on('update', (k) => {
        console.log(k);
        players[k] += delta;
        io.emit('update', players);
    });
});

server.listen(3000);

