var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('chat message', function(msg) {
    console.log('message: ' + JSON.stringify(msg));
    io.emit('chat message', msg);
  });
});

http.listen(3002, function() {
  console.log('listening on *:3002');
});
