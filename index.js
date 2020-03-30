const express = require('express');
const app = express();
const server = require('http').createServer(app);
const api = require('./routes/api.js');
const path = require('path');

app.use(express.static('public'));
app.use(express.static('video'));
app.use('/api', api.router);

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.get('/admin', function(req, res){
  res.sendFile(path.join(__dirname, './public', 'admin.html'));
});

server.listen(3000, () => {console.log("Listening on port 3000.");});
