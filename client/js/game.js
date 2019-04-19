$(document).ready(function() {
    loadImages();
    initKeys();
    canvasHeight = $("#gameCanvas").height();
    canvasWidth = $("#gameCanvas").width();
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
    firstMessage = false;
    connected = false;
    playButton = $("#playButton");
    socket = new WebSocket(url);
    socket.onopen = function(msg) {
        connected = true;
        playButton.on("click", function() {
            var x = randomRangeNumber(0, 512);
            var y = randomRangeNumber(0, 512);
            var num = randomRangeNumber(0, 5);
            var name = $("#playerName").val();
            player = new Ship(x, y, getImageByNum(num), num, 0, name);
            send(getId());
        });
    };

    socket.onmessage = function(msg) {
        var msgJson = JSON.parse(msg.data);
        switch (msgJson.type) {
            case UPDATE_ID:
                updateId(msgJson);
                break;
            default:
                break;
        }
        //parse msg
        // case id
        // case new bullet
        // if (!firstMessage) {
        //     player.id = msg.data;
        //     firstMessage = true;
        // }
        // else {
        //     if (msg != null && msg != undefined) {
        //         context.clearRect(0, 0, 1000, 1000)
        //         var data = JSON.parse(msg.data);
        //         updatePlayers(data);
        //         drawBullets();
        //         player.update();
        //         drawPlayers();
        //     }
        // }
    };

    socket.onclose = function(msg) {
        console.log("cerrado")
    };
});

function bucle() {
    send(postPlayerInfo(player));
    setTimeout("bucle()", 10);
}
