const express = require('express');
const router = express.Router();

var tickInterval;

var playing = false;
var currTime = 0;
var title = "";
var video = "video.mp4";
var subtitles = [];
//[{label: "Deutsch", lang: "de", src: "sub_de.vtt"}, {label: "English", lang: "en", src: "sub_en.vtt"}];

router.get('/state', function(req, res) {
  res.json(getState());
});

router.post('/state', (req, res) => {
  if(!req.session.adminPin) {
    return res.json({auth: false});
  }

  if(req.body.start == 'true'){
    startPlayback();
  } else if (req.body.reset == 'true'){
    resetPlayback();
  } else if (req.body.title != undefined) {
    title = req.body.title;
  } else if (req.body.time != undefined) {
    currTime = req.body.time;
  }

  if (req.body.video != undefined) {
    video = req.body.video;
  }

  if (req.body.subtitles != undefined) {
    subtitles = req.body.subtitles;
  }

  res.json(getState());
});

function getState() {
  return {time: currTime, title: title, playing: playing, video: video, subtitles: subtitles};
}

function resetPlayback() {
  clearInterval(tickInterval);
  tickInterval = undefined;
  currTime = 0;
  playing = false;
}

function startPlayback() {
  if(tickInterval == undefined) {
    tickInterval = setInterval(tick, 1000);
    playing = true;
  }
}

function tick() {
  currTime++;
}

module.exports = {
  router:router,
}
