const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*", // Allow only this origin or use "*" to allow all
        methods: ["GET", "POST"], // Allowed request methods
        allowedHeaders: ["my-custom-header"], // Custom headers here
        credentials: true // This allows session cookie from browser to pass through
    }
});

io.on('connection', (socket) => {
    console.log('Client connected');
    
    socket.on('dockerLog', (log) => {
        console.log(log);
        // This will emit to all clients, including the sender
        io.emit('log', log);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

