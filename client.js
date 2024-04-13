const io = require('socket.io-client');
const socket = io('http://localhost:4000'); // Ensure the URL is correct and includes http://
const spawn = require('child_process').spawn;

socket.on('connect', () => {
    console.log('Connected to server');
    socket.emit('dockerLog', 'Test log entry');
});

// Add an event listener for connection errors
socket.on('connect_error', (error) => {
    console.error('Socket.IO connection error:', error);
});

const dockerLogs = spawn('docker', ['logs', '-f', '5a7a4430eda6']);

dockerLogs.stderr.on('data', (data) => {
    try {
        socket.emit('dockerLog', data.toString());
    } catch (error) {
        console.error('Error emitting log data:', error);
    }
});

dockerLogs.on('error', (error) => {
    console.error('Failed to start docker logs process:', error);
});