const express = require('express');
const app = express();
const server = require('http').createServer(app);

app.use(express.static('public'));
app.use(express.static('video'));

var currTime = 300;

app.get('/', function(req, res){
  res.sendFile('./public/index.html');
});

app.get('/sync', function(req, res) {
  res.send(currTime.toString(10));
})

server.listen(3000, () => {console.log("Listening on port 3000.");});
