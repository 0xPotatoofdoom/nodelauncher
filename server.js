const serverPort = 3005;
const io = require('socket.io')(serverPort);
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('dockerLog', (log) => {
    console.log(log);  // Keep this if you want the server to also print the logs
    io.emit('broadcastLog', log);  // Broadcasts the log to all connected clients
  });
});
