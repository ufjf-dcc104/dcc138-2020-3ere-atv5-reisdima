export default class Animacao {
    constructor({
        imagem = null,
        poses = [],
        poseAtual = 0,
        xOffset = 64,
        yOffset = 64,
        width = 64,
        height = 64,
        sprite = null,
    }) {
        this.POSES = poses;
        this.poseAtual = poseAtual;
        this.quadroAtual = 0;
        this.imagem = imagem;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
    }

    desenhar(ctx, x, y) {
        ctx.drawImage(
            this.imagem,
            Math.floor(this.quadroAtual) * this.xOffset,
            this.poseAtual * this.yOffset,
            this.xOffset,
            this.yOffset,
            x - this.width / 2, // + (this.width - this.sprite.width) / 2,
            y - this.height / 2 - (this.height - this.sprite.height) / 2,
            this.width,
            this.height
        );
    }

    controlar(dt) {
        this.quadroAtual =
            this.quadroAtual >= this.POSES[this.poseAtual].qmax - 1
                ? 0
                : this.quadroAtual + this.POSES[this.poseAtual].pv * dt;
        if (this.sprite.vx > 0) {
            this.poseAtual = 11;
        } 
        if (this.sprite.vx < 0) {
            this.poseAtual = 9;
        } 
        if (this.sprite.vy > 0) {
            this.poseAtual = 10;
        } 
        if (this.sprite.vy < 0) {
            this.poseAtual = 8;
        }
        // else {
        //     this.quadroAtual = 0;
        // }
    }
}
