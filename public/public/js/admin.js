function startPlayback() {
  $.post('/api/state', {start: true}, data => {
    if(data.playing == true){
      bulmaToast.toast({message: "Done"});
    } else {
      bulmaToast.toast({message: "Error", type: "is-danger"});
      console.log(data);
    }
  }, 'json');
}

function resetPlayback() {
  $.post('/api/state', {reset: true}, data => {
    if(data.playing == false){
      bulmaToast.toast({message: "Done"});
    } else {
      bulmaToast.toast({message: "Error", type: "is-danger"});
      console.log(data);
    }
  }, 'json');
}

function saveTitle() {
  var title = $("#titleInput").val();

  $.post('/api/state', {title: title}, data => {
    if(data.title == title){
      bulmaToast.toast({message: "Done"});
    } else {
      bulmaToast.toast({message: "Error", type: "is-danger"});
      console.log(data);
    }
  }, 'json');
}

function setTime() {
  var time = parseInt($("#timeInput").val());

  $.post('/api/state', {time: time}, data => {
    if(data.time == time){
      bulmaToast.toast({message: "Done"});
    } else {
      bulmaToast.toast({message: "Error", type: "is-danger"});
      console.log(data);
    }
  }, 'json');
}

function addSubtitle() {
  $("#subtitleInput").clone().appendTo("#subtitleInputGroup").show();
}

function removeSubtitle() {
  $("#subtitleInputGroup").children().last().remove();
}

function setVideo() {
  var video = $("#videoInput").val();
  var subtitles = [];

  $("#subtitleInputGroup").children().each(function (i) {
    var label = $(this).find("#subtitleLabel").val();
    var lang = $(this).find("#subtitleLang").val();
    var src = $(this).find("#subtitlePath").val();

    subtitles.push({label: label, lang: lang, src: src});
  });

  console.log(subtitles);

  $.post('/api/state', {video: video, subtitles: subtitles}, data => {
    if(data.video == video){
      bulmaToast.toast({message: "Done"});
    } else {
      bulmaToast.toast({message: "Error", type: "is-danger"});
      console.log(data);
    }
  }, 'json');
}
