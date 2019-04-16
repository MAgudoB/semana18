$(document).ready(function() {
    loadImages();
    initKeys();
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
    context.fillStyle = "red"
    socket = new WebSocket(url);
    // Mensaje cuando se produce la conexion exitosa
    socket.onopen = function(msg) {
        console.log("Connected");
        var x = randomRangeNumber(0, 1000);
        var y = randomRangeNumber(0, 1000);
        player = new Ship(0, 0, getRandomImage());
    };
    setTimeout(function() {
        bucle();

    }, 1000)


    // Que voy a hacer cuando el servidor me envie un mensaje
    socket.onmessage = function(msg) {
        //console.log(msg.data)

        //contexto.clearRect(0,0,512,512)
        var numeropartido = msg.data.split("|").length;
        for (var i = 0; i < numeropartido / 3; i++) {
            context.fillStyle = "rgb(" + msg.data.split("|")[i * 3 + 2] + ")"
            context.fillRect(msg.data.split("|")[i * 3], msg.data.split("|")[i * 3 + 1], 3, 3)
        }

    };

    // Mensaje que te saco cuando el servidor se cierra
    socket.onclose = function(msg) {
        console.log("cerrado")
    };

});

function bucle() {
    //$("#posx").val(parseInt($("#posx").val()) + derecha);
    //$("#posy").val(parseInt($("#posy").val()) + arriba);
    //socket.send($("#posx").val() + "|" + $("#posy").val() + "|" + $("#color").val());
    context.clearRect(0, 0, 1000, 1000)
    player.update();
    for (var i in players) {
        players[i].update();
    }
    setTimeout("bucle()", 10);
}
