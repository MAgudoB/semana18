function Ship(x, y, img, imageInd, angle, name) {
    this.id = "";
    this.name = "";
    this.x = x;
    this.y = y;
    this.img = img;
    this.imageInd = imageInd;
    this.acceleration = 0;
    this.rotation = 0;
    this.angle = angle;
    this.speed = 3;
    this.maxLife = 100;
    this.life = 100;
    this.lvl = 1;
    this.nextLvl = 50;
    this.exp = 0;
    this.ammo = 0;
    this.name = name;


    this.draw = function() {
        drawImageRot(context, this.img, this.x, this.y, this.img.width, this.img.height, this.angle)
    }

    this.update = function() {
        this.move();
        this.draw();
    }

    this.shoot = function(shootAngle) {
        var bulletAngle = this.angle + shootAngle;
        var xBullet = this.x + Math.cos(this.angle - Math.PI / 2) * this.speed * this.acceleration;
        var yBullet = this.y + Math.sin(this.angle - Math.PI / 2) * this.speed * this.acceleration;
        bullets.push(new Bullet(xBullet, yBullet, this.id, 0));
    }

    this.move = function() {
        this.angle += this.rotation;
        this.x += Math.cos(this.angle - Math.PI / 2) * this.speed * this.acceleration;
        this.y += Math.sin(this.angle - Math.PI / 2) * this.speed * this.acceleration;
    }

    this.lvlUp = function() {
        this.maxLife += 25;
        this.life += 25;
        this.nextLvl = this.nextLvl * 2;
        this.lvl += 1;
    }

    this.addLife = function(life) {
        this.life += life;
    }

    this.addAmmo = function(ammo) {
        this.ammo += ammo;
    }

    this.addExp = function(exp) {
        this.exp += exp;
        this.checkLevelUp();
    }

    this.checkLevelUp = function() {
        if (this.exp >= this.nextLvl) {
            this.exp -= this.nextLvl;
            this.lvlUp();
            //Check again in case that we have experience to level up more than one level
            this.checkLevelUp();
        }
    }
}
