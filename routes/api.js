const express = require('express');
const router = express.Router();

var currTime = 0;

router.get('/sync', function(req, res) {
  res.send(currTime.toString(10));
});

router.get('/start', function(req, res) {
  res.send('Started.');

  setInterval(tick, 1000);
})

function tick() {
  currTime++;
}

module.exports = {
  router:router,
}
