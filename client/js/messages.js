// Metodos de envio y recepción de mensajes
function send(msg) {
    socket.send(msg);
}

//Mensajes que envía el cliente
function getId() {
    return JSON.stringify({ "type": GET_ID, "name": player.name });
}

function postPlayerInfo(ship) {
    return JSON.stringify({ "type": UPDATE_PLAYER, "x": ship.x, "y": ship.y, "angle": ship.angle, "imageInd": ship.imageInd });
}

function postLocalBullets(bullet) {
    return JSON.stringify({ "type": UPDATE_BULLETS, "x": bullet.x, "y": bullet.y, "angle": bullet.angle, "playerId": bullet.playerId, "id": bullet.id });
}
// function getBullestMsg(bullets) {
//     return JSON.stringify(bullets)
// }

// function getCollisionMsg(bullet) {

// }

// function getCollectable(collectable) {
//     return JSON.stringify({ id: collectable.id })
// }

//Mensajes que recibe el cliente
function updateId(msg) {
    player.id = msg.id;
    $("#login").hide();
    bucle();
}

function updatePlayers(data) {
    for (var i in data.users) {
        var remotePlayer = data.users[i];
        var found = false;
        for (var p in players) {
            if (players[p].id == i && i != player.id) {
                players[p].x = remotePlayer.x;
                players[p].y = remotePlayer.y;
                players[p].angle = remotePlayer.angle;
                found = true;
            }
        }
        if (!found && i != player.id && remotePlayer != null) {
            createNewPlayer(remotePlayer, i);
        }
    }
}

function updateBullets(data) {
    for (var i in data.bullets) {
        var remoteBullet = data.bullets[i];
        var found = false;
        if (remoteBullet != null) {
            for (var p in bullets) {
                if (bullets[p].id == remoteBullet.id && bullets[p].playerId != player.id) {
                    bullets[p].x = remoteBullet.x;
                    bullets[p].y = remoteBullet.y;
                    bullets[p].angle = remoteBullet.angle;
                    found = true;
                }
            }
            if (!found && remoteBullet.playerId != player.id) {
                createNewBullet(remoteBullet);
            }
        }
    }
}
