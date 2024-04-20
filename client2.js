const io = require('socket.io-client');
const socket = io('http://localhost:3000'); // Connect to the same server

socket.on('connect', () => {
    console.log('Connected to server and ready to receive logs.');
});

// Listen for the 'broadcastLog' event to display logs
socket.on('log', (log) => {
    console.log('Received log:', log);
});

// Handle connection errors
socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});
