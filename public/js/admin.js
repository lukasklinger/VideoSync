function init() {
}

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
