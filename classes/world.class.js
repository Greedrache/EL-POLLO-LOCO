class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud(),
        new Cloud()
    ];
    backgroundObject = [
        //new BackgroundObject("img/5_background/layers/air.png", 0),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      //  new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      //  new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0)
    ]
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.addtoMap(this.character);

        this.addObjecttoMap(this.enemies);   
        this.addObjecttoMap(this.backgroundObject);
        this.addObjecttoMap(this.clouds);
    

        requestAnimationFrame(() => this.draw()); // Je besser die Grafikkarte, desto höher die fps

    }

     addObjecttoMap(objects) {
         objects.forEach(o => {
             this.addtoMap(o);
         });
     }

     addtoMap(mo) {
             this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }
}