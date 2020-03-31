var player;
var initSync = false;

function initPlayback() {
  player = document.getElementById("player");

  player.onplay = function() {
    if(!initSync){
      initSync = true;
      setTimeout(syncPlay, 500);
    }
  };

  getTitle();
  setInterval(getTitle, 10000);
}

function syncPlay() {
  $.get( "/api/state", (data) => {
    if(parseInt(data.time) != 0){
      initSync = true;
      player.play();
      player.currentTime = parseInt(data.time);
    }
  });
}

function getTitle() {
  $.get( "/api/state", (data) => {
    if(data.title.length > 0) {
      $('h1').text(data.title);
      document.title = 'Playing ' + data.title;
    } else {
      $('h1').text("");
      document.title = 'VideoSync';
    }
  });
}
