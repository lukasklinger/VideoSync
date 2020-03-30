const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

const api = require('./routes/api.js');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(express.static('video'));

app.use('/api', api.router);

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.get('/admin', function(req, res){
  res.sendFile(path.join(__dirname, './public', 'admin.html'));
});

io.sockets.on('connection', function(socket) {
  socket.on('username', function(username) {
    socket.username = username;
    io.emit('is_online', '🔵 <i>' + socket.username + ' joined.</i>');
  });

  socket.on('disconnect', function(username) {
    if(socket.username != undefined) {
      io.emit('is_online', '🔴 <i>' + socket.username + ' left.</i>');
    }
  })

  socket.on('chat_message', function(message) {
    io.emit('chat_message', '<span>' + socket.username + '</span>: ' + message);
  });
});

server.listen(3000, () => {console.log("Listening on port 3000.");});
