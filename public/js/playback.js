var player;
var initSync = false;

function init() {
  player = document.getElementById("player");

  player.onplay = function() {
    if(!initSync){
      initSync = true;
      setTimeout(syncPlay, 500);
    }
  };
}

function syncPlay() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if(parseInt(this.responseText) != 0){
        initSync = true;
        player.play();
        player.currentTime = parseInt(this.responseText);
      }
    }
  };

  xhttp.open("GET", "/api/sync", true);
  xhttp.send();
}
