export default class Sprite {
    constructor({x = 100, y = 100, w=20, h=20, color="white"}={}) {
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
}
