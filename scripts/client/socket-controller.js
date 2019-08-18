
var socket = io.connect("http://localhost:5555");


setTimeout(function(){
    console.log(socket.id);
},4000);
