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

function postLocalBullets() {
    var auxBullets = new Array();
    for (var b in localBullets) {
        var bullet = {};
        bullet.x = localBullets[b].x;
        bullet.y = localBullets[b].y;
        bullet.angle = localBullets[b].angle;
        bullet.playerId = localBullets[b].playerId;
        bullet.id = localBullets[b].id;
        bullet.removed = localBullets[b].removed;
        auxBullets.push(bullet);
    }
    return JSON.stringify({ "type": UPDATE_BULLETS, "bullets": auxBullets });
}

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
    if (data.bullets[0].playerId == player.id) {
        for (var remoteBullets in data.bullets) {
            for (var b = localBullets.length - 1; b > 0; b--) {
                if (localBullets[b].id == data.bullets[remoteBullets].id) {
                    if (data.bullets[remoteBullets].removed) {
                        localBullets.splice(b, 1);
                    }
                    else if (data.bullets[remoteBullets].collided) {
                        localBullets.splice(b, 1);
                        for (var p in players) {
                            if (players[p].id == data.bullets[remoteBullets].target) {
                                players[p].removeLife(25);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    else {
        for (var remoteBullets in data.bullets) {
            var remoteBullet = data.bullets[remoteBullet];
            var found = false;
            for (var b = bullets.length - 1; b > 0; b--) {
                if (bullets[b].id == data.bullets[remoteBullets].id) {
                    if (data.bullets[remoteBullets].removed) {
                        bullets.splice(b, 1);
                    }
                    else if (data.bullets[remoteBullets].collided) {
                        bullets.splice(b, 1);
                        if (data.bullets[remoteBullets].target == player.id) {
                            player.removeLife(25);
                        }
                        else {
                            for (var p in players) {
                                if (players[p].id == data.bullets[remoteBullets].target) {
                                    players[p].removeLife(25);
                                    break;
                                }
                            }
                        }
                    }
                    found = true;
                    break;
                }
            }
            if (!found) {
                createNewBullet(data.bullets[remoteBullets]);
            }
        }
    }
}

function removePlayers(data) {
    for (var i in data.removePlayers) {
        var removedPlayer = data.removePlayers[i];
        if (removedPlayer != null) {
            for (var p in players) {
                if (players[p].id == removedPlayer.id) {
                    players.splice(i, 1);
                }
            }
            if (player.id == removedPlayer.id) {
                window.location.href = "end.html";
            }
        }
    }
}

function removeBullets(data) {
    for (var i in data.bullets) {
        var removedBullet = data.bullets[i];
        if (removedBullet != null && !removeBullets.removed) {
            for (var p in bullets) {
                if (bullets[p].id == removedBullet.id && bullets[p].playerId == removedBullet.playerId) {
                    //bullets.splice(p, 1);
                    bullets[p].removed = true;
                }
            }
            for (var p in localBullets) {
                if (localBullets[p].id == removedBullet.id && localBullets[p].playerId == removedBullet.playerId) {
                    localBullets[p].removed = true;
                }
            }
            player.removeLife(25);
        }
    }
}

function handleCollision(data) {
    removeBullets(data);
}

function playerDisconnected(data) {
    for (var i in players) {
        if (players[i].id == data.id) {
            players.splice(i, 1);
        }
    }
}
