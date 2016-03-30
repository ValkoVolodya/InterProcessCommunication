var api = {};
global.api = api;
api.net = require('net');

//array for computing
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var result = [];

//pool of clients
var clients = [];

var server = api.net.createServer(function(socket) {
  //print who`s connected
  console.log('Connected: ' + socket.localAddress);

  //just creating pull of clients
  clients.push(socket);
  console.log("Client connect, count: ", clients.length);

  //fixed number of wanted clients
  if (clients.length == 2){
    for (var i = 0; i < clients.length; i++){
      //count number for dividing
      var H = array.length / clients.length;
      //divide and send to client
      clients[i].write(JSON.stringify(array.slice(i * H, (i + 1) * H)));
    }
  }

  //get results
  socket.on('data', function(data) {
    console.log('Data received (by server): ' + data);
    //performing check, if recieved data is just what you need
    arr = JSON.parse(data);
    if (Array.isArray(arr)){
      result = result.concat(arr);
    }
    //printing result only if we have it
    if (result.length == array.length){
      console.log("Result : " + result);
    }
  });

  //deleting socket when it leaves
  socket.on('end', function () {
    clients.slice(clients.indexOf(socket), 1);
    console.log("deleting...");
  });
}).listen(2000);
