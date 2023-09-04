
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const utils = require('./public/js/utils')
app.get('/', (req, res) => {
  res.sendFile('/Users/rishavkumar/Desktop/petrichor/project/frontend/index.html');
});
app.use(express.static('public'));
io.on('connection', (socket) => {
    // let _id = utils.generateRandomString(6);
    // io.emit('new_user');
  socket.on('chat message', (msg) => {
    console.log(msg);
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

