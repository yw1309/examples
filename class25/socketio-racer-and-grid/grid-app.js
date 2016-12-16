
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const width = 30;
const height = 30;
const board = generateBoard(width, height);

board[randInt(0, height)][randInt(0, width)] = 1;

app.use(express.static('public'));

io.on('connect', (socket) => {
    socket.emit('initialBoard', board);

    socket.on('click', (coords) => {
        console.log(coords);
        let [row, col] = coords;
        // console.log(board);
        board[row][col] = !board[row][col];
        io.emit('update', board);
    });
});

function randInt(a, b) {
    const range = b - a;
    return Math.floor(Math.random() * range) + a;
}

function generateBoard(w, h) {
    const board = [];
    for(let i = 0; i < w; i++) {
        let row = [];
        for(let j = 0; j < h; j++) {
            row.push(false);
        } 
        board.push(row);
    }
    return board;
}

server.listen(3000);
