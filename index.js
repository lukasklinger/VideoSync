const express = require('express');
const app = express();
const server = require('http').createServer(app);

app.use(express.static('public'));
app.use(express.static('video'));

app.get('/', function(req, res){
  res.sendFile('./public/index.html');
});

server.listen(3000, () => {console.log("Listening on port 3000.");});
