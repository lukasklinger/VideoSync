var xhttp = new XMLHttpRequest();

function init() {
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      bulmaToast.toast({message: "Done"});
    } else if (this.readyState == 4 && this.status != 200){
      bulmaToast.toast({message: "Error", type: "is-danger"});
    }
  };
}

function startPlayback() {
  xhttp.open("GET", "/api/start", true);
  xhttp.send();
}

function resetPlayback() {
  xhttp.open("GET", "/api/reset", true);
  xhttp.send();
}
