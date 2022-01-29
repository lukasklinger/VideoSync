var player;
var syncCount = 0;
var autoSyncActive = true;
var currentState;
var chat = true;
var video = true;

function initPlayback() {
  player = document.getElementById('player')

  getVideo()
  getTitle()

  player.onplay = function () {
    if (syncCount == 0) {
      setTimeout(syncPlay, 100)
    }
  };

  player.onseeked = function () {
    if (syncCount == 1) {
      syncPlay()
    }
  };

  setInterval(getTitle, 10000)
  setInterval(autoSync, 30000)
}

function autoSync() {
  if (autoSyncActive) {
    $.get("/api/state", (data) => {
      if (autoSyncActive && syncCount > 1) {
        if (((parseInt(data.Playback.Seconds) - player.currentTime) > 5) || ((parseInt(data.Playback.Seconds) - player.currentTime) < -5)) {
          showMessage("<i>More than 5 seconds delay from server time, auto-syncing video. Disable in options.</i>")
          syncPlay()
        }
      }
    });
  }
}

function syncPlay() {
  $.get("/api/state", (data) => {
    if (parseInt(data.Playback.Seconds) != 0) {
      console.log("Syncing video with server.")
      syncCount++
      player.currentTime = parseInt(data.Playback.Seconds)
    }

    if (data.Playback.PlaybackRunning) {
      player.play()
    } else {
      player.pause()
    }
  });
}

function getTitle() {
  $.get("/api/state", (data) => {
    if (data.Video.Title.length > 0) {
      $('h1').text(data.title)
      document.title = 'Playing ' + data.Video.Title
    } else {
      $('h1').text("")
      document.title = 'VideoSync'
    }
  });
}

function getVideo() {
  $.get("/api/state", (data) => {
    source = document.createElement("source")

    source.type = "video/mp4"
    source.src = `/static/${data.Video.Path}`

    player.append(source)

    if (data.Subtitles != undefined && data.Subtitles.length > 0) {
      for (var i = 0; i < data.Subtitles.length; i++) {
        track = document.createElement("track")

        track.kind = "captions"
        track.label = data.Subtitles[i].Language
        track.srclang = data.Subtitles[i].LanguageCode
        track.src = `/static/${data.Subtitles[i].Path}`

        player.append(track)
      }
    }
  });
}

function disableAutoSync() {
  if (autoSyncActive) {
    autoSyncActive = false
    $('#autoSyncButton').html('Enable Auto-Sync')
    showMessage("<i>Auto-Sync disabeled.</i>")
  } else {
    autoSyncActive = true
    $('#autoSyncButton').html('Disable Auto-Sync')
    showMessage("<i>Auto-Sync enabeled.</i>")
  }
}

function toggleChat() {
  if (chat) {
    chat = false
    $('#sideColumn').hide()
    $('#optionContainerUnderVideo').show()
    $('#videoColumn').removeClass('is-three-quarters')
    $("#videoColumn").css("overflow-y", "scroll")
  } else {
    chat = true
    $('#sideColumn').show()
    $('#optionContainerUnderVideo').hide()
    $('#videoColumn').addClass('is-three-quarters')
    $("#videoColumn").css("overflow-y", "hidden")
  }
}

function toggleVideo() {
  if (video) {
    video = false
    $('#videoColumn').hide()
    $('#videoToggleButton').html('Enable Video')
  } else {
    video = true;
    $('#videoColumn').show()
    $('#videoToggleButton').html('Disable Video')
  }
}