var api = {};
global.api = api;
api.net = require('net');

//array for computing
var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

var clients = [];
var result = [];

var server = api.net.createServer(function(socket) {
  console.log('Connected: ' + socket.localAddress);
  socket.on('data', function(data) {
    console.log('Data received (by server): ' + data);
    //performing check, if recieved data is just what you need
    arr = JSON.parse(data);
    if (Array.isArray(arr)){
      result = result.concat(arr);
    }
    //printing result of each iteration
    console.log("Result : " + result);
  });
}).listen(2000);

server.on('connection', function (socket) {
  //just creating pull of clients
  clients.push(socket);
  console.log("Client connect, count: ", clients.length);
  //fixed number of wanted clients
  if (clients.length == 2){
    for (var i = 0; i < clients.length; i++){
      //count number for dividing
      var H = data.length / clients.length;
      //divide and send to client
      clients[i].write(JSON.stringify(data.slice(i * H, (i + 1) * H)));
    }
  }
});
