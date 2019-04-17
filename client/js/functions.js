function initKeys() {
    $(document).keydown(function(event) {
        if (event.key == "w") { player.acceleration = 1; }
        if (event.key == "s") { player.aceleration = -1; }
        if (event.key == "a") { player.rotation = -0.15; }
        if (event.key == "d") { player.rotation = +0.15; }

    });
    $(document).keyup(function(event) {
        if (event.key == "w") { player.acceleration = 0 }
        if (event.key == "s") { player.acceleration = 0 }
        if (event.key == "a") { player.rotation = 0 }
        if (event.key == "d") { player.rotation = 0 }
    });
}

function loadImages() {
    ship1.src = "img/Ships/ship1.png";
    ship2.src = "img/Ships/ship2.png";
    ship3.src = "img/Ships/ship3.png";
    ship4.src = "img/Ships/ship4.png";
    ship5.src = "img/Ships/ship5.png";
    ship6.src = "img/Ships/ship6.png";
    cannonBall.src = "img/ShipParts/cannonBall.png";
}

function randomRangeNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomImage() {
    var image = new Image();
    var num = randomRangeNumber(0, 5);
    switch (num) {
        case 0:
            image = ship1;
            break;
        case 1:
            image = ship2;
            break;
        case 2:
            image = ship3;
            break;
        case 3:
            image = ship4;
            break;
        case 4:
            image = ship5;
            break;
        case 5:
            image = ship6;
            break;
    }
    return image;
}

function drawImageRot(rotContext, img, x, y, width, height, rad) {
    //Set the origin to the center of the image
    rotContext.translate(x + width / 2, y + height / 2);
    //Rotate the canvas around the origin
    rotContext.rotate(rad);
    //draw the image
    rotContext.drawImage(img, width / 2 * (-1), height / 2 * (-1), width, height);
    //reset the canvas
    rotContext.rotate((rad) * (-1));
    rotContext.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
}

function drawBullets() {
    for (var i in bullets) {
        bullets[i].update();
    }
}

function drawPlayers() {
    for (var i in players) {
        players[i].update();
    }
}

function squareCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 &&
        x1 + w1 > x2 &&
        y1 < y2 + h2 &&
        y1 + h1 > y2;
}
