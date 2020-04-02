var socket = io.connect();

function initChat() {
  $('#usernameContainer').show()

  // submit text message without reload/refresh the page
  $('#chatForm').submit(function(e) {
    e.preventDefault(); // prevents page reloading

    var message = $('#txt').val();
    if(message.length > 0){
      socket.emit('chat_message', $('#txt').val());
      $('#txt').val('');
    }

    return false;
  });

  // submit username without reload/refresh the page
  $('#usernameForm').submit(function(e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('username', $('#usernameTxt').val());
    $('#usernameContainer').hide();
    $('#messageInputContainer').show();
    return false;
  });

  // append the chat text message
  socket.on('chat_message', function(msg) {
    $('#messages').append($('<li>').html(msg));
    scrollToMessage();
  });

  // append text if someone is online/offline
  socket.on('is_online', function(username) {
    $('#messages').append($('<li>').html(username));
    scrollToMessage();
  });

  var picker = new EmojiButton({position: 'top-start', theme: 'dark', style: 'native'});
  var button = document.querySelector('#emojiButton');

  picker.on('emoji', emoji => {
    document.querySelector('#txt').value += emoji;
  });

  button.addEventListener('click', function () {
    picker.togglePicker(button);
  });
}

function scrollToMessage() {
  $('#chatContainer').animate({scrollTop: $('#chatContainer').prop("scrollHeight")}, 400);
}
