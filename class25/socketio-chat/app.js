/* jshint esnext:true */
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.static('public'));

io.on('connect', (socket) => {
    // socket represents the connected client
    console.log(socket.id, 'connected');

    // listen 
    socket.on('chat message', (data) => {
        // broadcast them to all connected clients
        console.log(data);
        // broadcast to everyone
        io.emit('chat message', data);
    });

});





server.listen(3000);
