// Metodos de envio y recepción de mensajes
function send(msg) {
    socket.send(msg);
}

//Mensajes que envía el cliente
function getId() {
    return JSON.stringify({ "type": GET_ID, "name": player.name });
}

function postPlayerInfo(ship) {
    return JSON.stringify({ "type": UPDATE_PLAYER, "x": ship.x, "y": ship.y, "angle": ship.angle });
}

function getBullestMsg(bullets) {
    return JSON.stringify(bullets)
}

function getCollisionMsg(bullet) {

}

function getCollectable(collectable) {
    return JSON.stringify({ id: collectable.id })
}

//Mensajes que recibe el cliente
function updateId(msg) {
    player.id = msg.id;
    $("#login").hide();
    bucle();
}

function updatePlayers(data) {
    for (var i in data) {
        var found = false;
        var dataObj = JSON.parse(data[i]);
        for (var p in players) {
            if (players[p].id == dataObj.id && dataObj.id != player.id) {
                players[p].x = dataObj.x;
                players[p].y = dataObj.y;
                players[p].angle = dataObj.angle;
                found = true;
            }
        }
        if (!found && dataObj.id != player.id) {
            createNewPlayer(dataObj);
        }
    }
}

function updateBullets(data) {

}
