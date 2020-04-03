var player;
var syncCount = 0;
var autoSyncActive = true;
var currentState;

function initPlayback() {
  player = document.getElementById("player");

  player.onplay = function() {
    if(syncCount == 0){
      setTimeout(syncPlay, 100);
    }
  };

  player.onseeked = function() {
    if(syncCount == 1){
      syncPlay();
    }
  };

  getTitle();

  setInterval(getTitle, 10000);
  setInterval(autoSync, 2000);
}

function autoSync() {
  if(autoSyncActive){
    $.get( "/api/state", (data) => {
      if(autoSyncActive && player.paused != true) {
        if (syncCount > 1) {
          if (((parseInt(data.time) - player.currentTime) > 5) || ((parseInt(data.time) - player.currentTime) < -5)) {
            syncPlay();
            showMessage("<i>More than 5 seconds delay from server time, auto-syncing video. Disable in options.</i>");
          }
        }
      }
    });
  }
}

function syncPlay() {
  $.get( "/api/state", (data) => {
    if(parseInt(data.time) != 0){
      console.log("Syncing video with server.");
      syncCount++;
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

function disableAutoSync() {
  if(autoSyncActive) {
    autoSyncActive = false;
    $('#autoSyncButton').html('Enable Auto-Sync');
    showMessage("<i>Auto-Sync disabeled.</i>");
  } else {
    autoSyncActive = true;
    $('#autoSyncButton').html('Disable Auto-Sync');
    showMessage("<i>Auto-Sync enabeled.</i>");
  }
}
