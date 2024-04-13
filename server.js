const serverPort = 4000;
const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: "*",  // For development ease, restrict this in production
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');
  io.emit('log', 'hello client');

  // Listen for the connection message
  socket.on('connectMessage', (message) => {
    console.log('Received message on connect:', message);
    // You can also broadcast this message to other clients
    io.emit('log', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(serverPort, () => {
  console.log(`Server running at http://localhost:${serverPort}/`);
});
