var socket = io.connect();

function initChat() {
  $('#chatContainer').hide();

  // submit text message without reload/refresh the page
  $('#chatForm').submit(function(e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('chat_message', $('#txt').val());
    $('#txt').val('');
    return false;
  });

  // submit username without reload/refresh the page
  $('#usernameForm').submit(function(e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('username', $('#usernameTxt').val());
    $('#usernameContainer').hide();
    $('#chatContainer').show();
    return false;
  });

  // append the chat text message
  socket.on('chat_message', function(msg) {
    $('#messages').append($('<li>').html(msg));
  });

  // append text if someone is online
  socket.on('is_online', function(username) {
    $('#messages').append($('<li>').html(username));
  });
}
