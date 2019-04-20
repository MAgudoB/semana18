$(document).ready(function() {
    loadImages();
    //initKeys();
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
            var x = randomRangeNumber(0, window.innerWidth);
            var y = randomRangeNumber(0, window.innerHeight);
            var num = randomRangeNumber(0, 5);
            var name = $("#playerName").val();
            player = new Ship(x, y, getImageByNum(num), num, 0, name);
            initKeys();
            send(getId());
        });
    };

    socket.onmessage = function(msg) {
        if (msg.data != null && msg.data != undefined && msg.data != "null" && msg.data != "") {
            var msgJson = JSON.parse(msg.data);
            switch (msgJson.type) {
                case UPDATE_ID:
                    updateId(msgJson);
                    break;
                case UPDATE_PLAYERS:
                    updatePlayers(msgJson);
                    break;
                case UPDATE_BULLETS:
                    updateBullets(msgJson);
                    break;
                default:
                    break;
            }
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
    context.clearRect(0, 0, canvasWidth, canvasHeight)
    player.update();
    drawPlayers();
    drawBullets();
    send(postPlayerInfo(player));
    for (var i in localBullets) {
        send(postLocalBullets(localBullets[i]));
    }
    setTimeout("bucle()", 10);
}
