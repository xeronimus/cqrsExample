'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)
var port = 9999;


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
  }
);
app.use(express.static(__dirname + '/resources'));

io.on('connection', function (socket) {
  console.log('client connected');

  socket.on('disconnect', function () {
    console.log('client disconnected');
  });

  socket.on('commands', function (command) {
    socket.emit('events', {
      viewModel: 'personDetailView',
      eventName: 'moved',
      payload: command.payload
    });
  });

});


var i = 0;
setInterval(function () {
  i++;
  io.emit('events', {
    viewModel: 'personDetailView',
    eventName: 'moved',
    payload: {
      id: 1,
      address: 'myStreet' + i
    }});
}, 5000);


http.listen(port, function () {
  console.log('listening on *:' + port);
});



