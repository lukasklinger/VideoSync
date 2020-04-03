var socket = io.connect();

function initChat() {
  $('#usernameContainer').show()

  // submit text message without reload/refresh the page
  $('#chatForm').submit(function(e) {
    e.preventDefault(); // prevents page reloading

    var message = $('#txt').val();
    if (message.length > 0) {
      socket.emit('chat_message', sanatizeInput($('#txt').val()));
      $('#txt').val('');
    }

    return false;
  });

  // submit username without reload/refresh the page
  $('#usernameForm').submit(function(e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('username', sanatizeInput($('#usernameTxt').val()));
    $('#usernameContainer').hide();
    $('#messageInputContainer').show();
    return false;
  });

  // append the chat text message
  socket.on('chat_message', function(msg) {
    showMessage(msg);
  });

  // append text if someone is online/offline
  socket.on('is_online', function(username) {
    showMessage(username);
  });

  // retransmit username if reconnected
  socket.on('reconnect', function() {
    if ($('#usernameTxt').val().length > 0) {
      socket.emit('username', $('#usernameTxt').val());
    }
  })

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
  $('#messages').append($('<li>').html(message));
  scrollToMessage();
}

function sanatizeInput(input) {
  var temp = document.createElement('div');
  temp.textContent = input ;
  var sanatizedOut = temp.innerHTML;
  temp.remove();
  return sanatizedOut;
}
