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
    this.bulletsShooted = 0;
    this.nextShoot = 0;


    this.draw = function() {
        drawImageRot(context, this.img, this.x + gapx, this.y + gapy, this.img.width, this.img.height, this.angle)
    }

    this.update = function() {
        this.move();
        this.draw();
    }

    this.shoot = function(shootAngle) {
        if (this.nextShoot >= TIME_TO_SHOOT) {
            var bulletAngle = this.angle + shootAngle;
            var xBullet = this.x + this.img.width / 2;
            var yBullet = this.y + this.img.height / 2;
            this.bulletsShooted++;
            localBullets.push(new Bullet(xBullet, yBullet, bulletAngle, this.id, this.bulletsShooted));
            this.nextShoot = 0;
        }
    }

    this.move = function() {
        this.nextShoot++;
        this.angle += this.rotation;
        this.x += Math.cos(this.angle) * this.speed * this.acceleration;
        this.y += Math.sin(this.angle) * this.speed * this.acceleration;
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

    this.removeLife = function(life) {
        this.life -= life;
        this.loadDamage();
    }

    this.loadDamage = function() {
        var aux = this.img.src.split(".png");
        switch (this.life) {
            case 50:
                this.img.src = aux[0] + "_50.png"
                break;
            case 25:
                this.img.src = aux[0] + "_25.png"
                break;
            case 0:
                this.img.src = aux[0] + "_0.png"
                window.location.href = "end.html";
                break;
            default:
                break;
        }
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
