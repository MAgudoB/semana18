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
    playButton.on("click", function() {
        socket = new WebSocket(url);
        waitForSocketConnection(socket, function() {
            loadSocket();
            var x = randomRangeNumber(0, window.innerWidth);
            var y = randomRangeNumber(0, window.innerHeight);
            var num = randomRangeNumber(0, 5);
            var name = $("#playerName").val();
            player = new Ship(x, y, getImageByNum(num), num, 0, name);
            initKeys();
            send(getId());
            connected = true;
        });
    });

});

function loadSocket() {
    socket.onopen = function(msg) {
        connected = true;

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
                case REMOVE_PLAYERS:
                    removePlayers(msgJson);
                    break;
                case PLAYER_QUIT:
                    playerDisconnected(msgJson);
                    break;
                default:
                    break;
            }
        }
    };

    socket.onclose = function(msg) {
        window.location.href = "end.html";
    };
}

function bucle() {
    if (connected) {
        context.clearRect(0, 0, canvasWidth, canvasHeight)
        player.update();
        drawPlayers();
        drawBullets();
        send(postPlayerInfo(player));
        if (localBullets.length > 0) {
            send(postLocalBullets());
        }
    }
    setTimeout("bucle()", 10);
}

function waitForSocketConnection(socket, callback) {
    setTimeout(
        function() {
            if (socket.readyState === 1) {
                console.log("Connection is made")
                if (callback != null) {
                    callback();
                }
            }
            else {
                console.log("wait for connection...")
                waitForSocketConnection(socket, callback);
            }

        }, 5); // wait 5 milisecond for the connection...
}
