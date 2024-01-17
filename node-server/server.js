const path = require('path');
const {version,validate} = require('uuid');
const express = require('express');
const { userInfo } = require('os');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors: {
        origin: "http://localhost:3000",
        credentials: true
      }
});
const PORT = process.env.PORT || 3001;

let onlineUsers = [];

io.on('connection', (socket) => {
    socket.on('userConnected', (user) => {
      onlineUsers.push({ ...user, socketId: socket.id });
      io.emit('onlineUsers', onlineUsers);
    });
  
    socket.on('disconnect', () => {
      onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
      io.emit('onlineUsers', onlineUsers);
    });
  });

server.listen(PORT,()=>{
    console.log('Server started',PORT)
})