$(document).ready(function() {
    loadImages();
    initKeys();
    canvasHeight = $("#gameCanvas").height();
    canvasWidth = $("#gameCanvas").width();
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
    firstMessage = false;
    connected = false;
    socket = new WebSocket(url);

    socket.onopen = function(msg) {
        connected = true;
        var x = randomRangeNumber(0, 1000);
        var y = randomRangeNumber(0, 1000);
        var num = randomRangeNumber(0, 5);
        player = new Ship(0, 0, getImageByNum(num), num, 0);
    };
    setTimeout(function() {
        bucle();

    }, 1000)


    socket.onmessage = function(msg) {
        if (!firstMessage) {
            player.id = msg.data;
            firstMessage = true;
        }
        else {
            if (msg != null && msg != undefined) {
                context.clearRect(0, 0, 1000, 1000)
                var data = JSON.parse(msg.data);
                updatePlayers(data);
                drawBullets();
                player.update();
                drawPlayers();
            }
        }
    };

    socket.onclose = function(msg) {
        console.log("cerrado")
    };

});



function bucle() {
    if (connected) {
        sendInfo();
    }
    setTimeout("bucle()", 10);
}

function sendInfo() {
    socket.send(JSON.stringify(player));
}
