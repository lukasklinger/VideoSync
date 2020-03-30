const express = require('express');
const router = express.Router();

var tickInterval;
var currTime = 0;
var title = "";

router.get('/sync', function(req, res) {
  res.send(currTime.toString(10));
});

router.get('/start', function(req, res) {
  if(tickInterval == undefined) {
    tickInterval = setInterval(tick, 1000);
  }

  res.sendStatus(200);
})

router.get('/reset', function(req, res) {
  clearInterval(tickInterval);
  tickInterval = undefined;
  currTime = 0;

  res.sendStatus(200);
})

router.get('/title', function(req, res) {
  res.send(title);
})

router.post('/title', (req, res) => {
  if(req.body.title != undefined) {
    title = req.body.title;
  } else {
    title = "";
  }

  res.sendStatus(200);
});

function tick() {
  currTime++;
}

module.exports = {
  router:router,
}
