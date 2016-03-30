var api = {};
global.api = api;
api.net = require('net');

var socket = new api.net.Socket();
var user;

socket.connect({
  port: 2000,
  host: '127.0.0.1',
}, function() {
  socket.write(JSON.stringify('Hello from client'));
  socket.on('data', function(data) {
    obj = JSON.parse(data);
    console.log('Data received (by client): ' + data);
    for (var i = 0; i < obj.array.length; i++){
      obj.array[i] *= 2;
    }
    console.log("The data sent to server: " + obj.array);
    socket.write(JSON.stringify(obj));
  });
});
