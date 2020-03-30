const express = require('express');
const app = express();
const server = require('http').createServer(app);
const api = require('./routes/api.js');

app.use(express.static('public'));
app.use(express.static('video'));
app.use('/api', api.router);

app.get('/', function(req, res){
  res.sendFile('./public/index.html');
});

server.listen(3000, () => {console.log("Listening on port 3000.");});
