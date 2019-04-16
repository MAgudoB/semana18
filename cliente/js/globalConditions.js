var canvas = document.getElementById("lienzo");
var contexto = document.getElementById("lienzo").getContext("2d");
contexto.fillStyle = "red"
 // Hago una conexión a un puerto TCP de un servidor que esta a la escucha
var direccion = "wss://semana17-magudob.c9users.io:8082/echobot";
var socket = new WebSocket(direccion);
var derecha = 0;
var arriba = 0;

// Mensaje cuando se produce la conexion exitosa
socket.onopen = function(msg) { 
    console.log("El canal de comunicación se ha abierto");
};
setTimeout(function(){
    bucle();
   
},1000)


// Que voy a hacer cuando el servidor me envie un mensaje
socket.onmessage = function(msg) { 
   //console.log(msg.data)
   
   //contexto.clearRect(0,0,512,512)
   var numeropartido = msg.data.split("|").length;
   for(var i = 0;i<numeropartido/3;i++){
       contexto.fillStyle = "rgb("+msg.data.split("|")[i*3+2]+")"
       contexto.fillRect(msg.data.split("|")[i*3],msg.data.split("|")[i*3+1],3,3)
   }
   
};

// Mensaje que te saco cuando el servidor se cierra
socket.onclose   = function(msg) { 
    console.log("cerrado") 
};