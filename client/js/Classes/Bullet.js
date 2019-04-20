function Bullet(x, y, angle, playerId, id) {
    this.x = x;
    this.y = y;
    this.playerId = playerId;
    this.id = id;
    this.img = cannonBall;
    this.speed = 5;
    this.angle = angle
    this.velX = Math.cos(this.angle) * this.speed;
    this.velY = Math.sin(this.angle) * this.speed;
    this.energy = 100;

    this.draw = function() {
        context.drawImage(this.img, this.x, this.y);
    }

    this.update = function() {
        this.move();
        this.draw();
    }

    this.move = function() {
        this.x += this.velX;
        this.y += this.velY;
        //REmove bullet if goes out of screen
        if (this.x + this.img.width < 0 ||
            this.x > canvasWidth ||
            this.y > canvasHeight ||
            this.y + this.img.height < 0) {
            this.destroyBullet();
        }
    }

    this.destroyBullet = function() {
        for (var i in bullets) {
            if (bullets[i].playerId == this.playerId && bullets[i].id == this.id) {
                bullets.splice(i, 1);
            }
        }
    }
}
