function Ship(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.acceleration = 0;
    this.rotation = 0;
    this.angle = 0;
    this.speed = 5;


    this.draw = function() {
        //context.drawImage(this.img, this.x, this.y);
        drawImageRot(context, this.img, this.x, this.y, this.img.width, this.img.height, this.angle)
    }

    this.update = function() {
        this.move();
        this.draw();
    }

    this.shoot = function() {

    }

    this.move = function() {
        this.angle += this.rotation;
        this.x += Math.cos(this.angle - Math.PI / 2) * this.speed * this.acceleration;
        this.y += Math.sin(this.angle - Math.PI / 2) * this.speed * this.acceleration;
    }
}
