export default class Sprite {
    /*
        É responsável por modelar algo na tela.
    */
    constructor({x = 100, y = 100, w=20, h=20, color="white", vx=0, vy=0}={}) {
        this.vx = x;
        this.vy = y;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = color;
    }

    desenhar(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    passo(dt){
        this.x = this.x * this.vx * dt;
        this.y = this.y * this.vy * dt;
    }
}
