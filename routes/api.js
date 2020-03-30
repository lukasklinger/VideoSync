const express = require('express');
const router = express.Router();

var tickInterval;
var currTime = 0;

router.get('/sync', function(req, res) {
  res.send(currTime.toString(10));
});

router.get('/start', function(req, res) {
  if(tickInterval == undefined) {
    tickInterval = setInterval(tick, 1000);
  }

  res.status = 200;
  res.end();
})

router.get('/reset', function(req, res) {
  clearInterval(tickInterval);
  tickInterval = undefined;
  currTime = 0;

  res.status = 200;
  res.end();
})

function tick() {
  currTime++;
}

module.exports = {
  router:router,
}
