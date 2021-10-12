const url = "ws://" + window.location.host + "/ws"
const ws = new WebSocket(url)

var username

function initChat() {
  $('#usernameContainer').show()

  // submit text message without reload/refresh the page
  $('#chatForm').submit(function(e) {
    e.preventDefault(); // prevents page reloading

    var message = $('#txt').val()
    if (message.length > 0) {
      var message = {"username": username, "content": sanatizeInput($('#txt').val())}
      ws.send(JSON.stringify(message))
      $('#txt').val('')
    }

    return false;
  });

  // save username without reload/refresh the page
  $('#usernameForm').submit(function(e) {
    e.preventDefault() // prevents page reloading

    if ($('#usernameTxt').val().length > 0) {
      username = sanatizeInput($('#usernameTxt').val())
      ws.send(JSON.stringify({"username": username, "content": "joined"}))
  
      $('#usernameContainer').hide();
      $('#messageInputContainer').show();
    }

    return false;
  });

  // append the chat text message
  ws.onmessage = function (msg){
    showMessage(JSON.parse(msg.data))
  }

  var picker = new EmojiButton({
    position: 'top-start',
    theme: 'dark',
    style: 'native'
  });
  var button = document.querySelector('#emojiButton');

  picker.on('emoji', emoji => {
    document.querySelector('#txt').value += emoji;
  });

  button.addEventListener('click', function() {
    picker.togglePicker(button);
  });
}

function scrollToMessage() {
  $('#chatContainer').animate({
    scrollTop: $('#chatContainer').prop("scrollHeight")
  }, 400);
}

function showMessage(message) {
  var msgObj = JSON.parse(message.body)
  $('#messages').append($('<li>').html(msgObj.username + ": " + msgObj.content));
  scrollToMessage();
}

function sanatizeInput(input) {
  var temp = document.createElement('div');
  temp.textContent = input ;
  var sanatizedOut = temp.innerHTML;
  temp.remove();
  return sanatizedOut;
}
