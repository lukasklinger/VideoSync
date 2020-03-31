const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const memoryStore = require('memorystore')(session)
const io = require('socket.io')(server);

const api = require('./routes/api.js');
const path = require('path');

const openAccess = true;
const watchPin = '3232';
const adminPin = '4542';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new memoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: 'such secret. so secure. wow.',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('./html/public'));
app.use(express.static('./video'));

app.use('/api', api.router);

app.get('/', function(req, res){
  if(req.session.watchPin != watchPin && !openAccess) {
    return res.redirect('/pin');
  }

  res.sendFile(path.join(__dirname, './html', 'home.html'));
});

app.get('/video', function(req, res){
  if(req.session.watchPin != watchPin && !openAccess) {
    return res.redirect('/pin');
  }

  res.sendFile(path.join(__dirname, './html', 'video.html'));
});

app.get('/admin', function(req, res){
  if(req.session.adminPin != adminPin) {
    return res.redirect('/pin');
  }

  res.sendFile(path.join(__dirname, './html', 'admin.html'));
});

app.get('/pin', function(req, res){
  res.sendFile(path.join(__dirname, './html', 'pin.html'));
});

app.post('/pin', function(req, res){
  let sess = req.session;

  if(req.body.pin == watchPin) {
    sess.watchPin = req.body.pin;
    res.redirect('/');
  } else if(req.body.pin == adminPin) {
    sess.adminPin = req.body.pin;
    res.redirect('/admin');
  } else {
    res.redirect('/pin');
  }
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
