const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
app.use(express.static('public'));


const io = new Server(server);

app.get('/', (req, res) => {

  res.sendFile(__dirname + '/index.html');

});

var counter = 0

io.on('connection', (socket) => {

  console.log('connected');

  counter++;

  io.sockets.emit('cnt-2', counter)

  socket.on('disconnect', () => {
    console.log(('disconnect'))
      counter--;
  })
  
  // reconnect
  // ping

});

server.listen(3000, () => {

  console.log('Listening on port 3000');

});
