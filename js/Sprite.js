export default class Sprite {
    /*
        É responsável por modelar algo na tela.
    */
    constructor({
        x = 100,
        y = 100,
        w = 20,
        h = 20,
        color = "white",
        vx = 0,
        vy = 0,
        controlar = () => {},
        tags = [],
        image = null,
    } = {}) {
        this.vx = vx;
        this.vy = vy;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = color;
        this.cena = null;
        this.image = image;
        this.mx = 0;
        this.my = 0;
        this.controlar = controlar;
        this.tags = new Set();
        tags.forEach((tag) => {
            this.tags.add(tag);
        });
    }

    desenhar(ctx) {
        ctx.fillStyle = this.color;
        if (this.image) {
            ctx.drawImage(
                this.cena.assets.img(this.image),
                this.x - this.width / 2,
                this.y - this.height / 2,
                this.width,
                this.height
            );
        } else {
            ctx.fillRect(
                this.x - this.width / 2,
                this.y - this.height / 2,
                this.width,
                this.height
            );
            ctx.strokeStyle = "blue";
            ctx.strokeRect(
                this.mx * this.cena.mapa.SIZE,
                this.my * this.cena.mapa.SIZE,
                this.cena.mapa.SIZE,
                this.cena.mapa.SIZE
            );
        }
    }

    controlar(dt) {}

    mover(dt) {
        this.x = this.x + this.vx * dt;
        this.y = this.y + this.vy * dt;
        this.mx = Math.floor(this.x / this.cena.mapa.SIZE);
        this.my = Math.floor(this.y / this.cena.mapa.SIZE);
    }

    passo(dt) {
        this.controlar(dt);
        this.mover(dt);
    }

    colidiuCom(outro) {
        return !(
            this.x - this.width / 2 > outro.x + outro.width / 2 ||
            this.x + this.width / 2 < outro.x - outro.width / 2 ||
            this.y - this.height / 2 > outro.y + outro.height / 2 ||
            this.y + this.height / 2 < outro.y - outro.height / 2
        );
    }

    aplicaRestricoes(dt) {
        this.aplicaRestricoesDireita(this.mx + 1, this.my - 1);
        this.aplicaRestricoesDireita(this.mx + 1, this.my);
        this.aplicaRestricoesDireita(this.mx + 1, this.my + 1);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my - 1);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my + 1);
        this.aplicaRestricoesCima(this.mx - 1, this.my - 1);
        this.aplicaRestricoesCima(this.mx, this.my - 1);
        this.aplicaRestricoesCima(this.mx + 1, this.my - 1);
        this.aplicaRestricoesBaixo(this.mx - 1, this.my + 1);
        this.aplicaRestricoesBaixo(this.mx, this.my + 1);
        this.aplicaRestricoesBaixo(this.mx + 1, this.my + 1);
    }

    aplicaRestricoesDireita(pmx, pmy) {
        const SIZE = this.cena.mapa.SIZE;
        if (this.vx > 0) {
            if (this.cena.mapa.tiles[pmy][pmx] != 0) {
                const tile = {
                    x: pmx * SIZE + SIZE / 2,
                    y: pmy * SIZE + SIZE / 2,
                    width: SIZE,
                    height: SIZE,
                };
                this.cena.ctx.strokeStyle = "white";
                this.cena.ctx.strokeRect(
                    tile.x - SIZE / 2,
                    tile.y - SIZE / 2,
                    SIZE,
                    SIZE
                );
                if (this.colidiuCom(tile)) {
                    this.vx = 0;
                    this.x = tile.x - tile.width / 2 - this.width / 2 - 1;
                }
            }
        }
    }

    aplicaRestricoesEsquerda(pmx, pmy) {
        const SIZE = this.cena.mapa.SIZE;
        if (this.vx < 0) {
            if (this.cena.mapa.tiles[pmy][pmx] != 0) {
                const tile = {
                    x: pmx * SIZE + SIZE / 2,
                    y: pmy * SIZE + SIZE / 2,
                    width: SIZE,
                    height: SIZE,
                };
                this.cena.ctx.strokeStyle = "white";
                this.cena.ctx.strokeRect(
                    tile.x - SIZE / 2,
                    tile.y - SIZE / 2,
                    SIZE,
                    SIZE
                );
                if (this.colidiuCom(tile)) {
                    this.vx = 0;
                    this.x = tile.x + tile.width / 2 + this.width / 2 + 1;
                }
            }
        }
    }
    aplicaRestricoesBaixo(pmx, pmy) {
        const SIZE = this.cena.mapa.SIZE;
        if (this.vy > 0) {
            if (this.cena.mapa.tiles[pmy][pmx] != 0) {
                const tile = {
                    x: pmx * SIZE + SIZE / 2,
                    y: pmy * SIZE + SIZE / 2,
                    width: SIZE,
                    height: SIZE,
                };
                this.cena.ctx.strokeStyle = "white";
                this.cena.ctx.strokeRect(
                    tile.x - SIZE / 2,
                    tile.y - SIZE / 2,
                    SIZE,
                    SIZE
                );
                if (this.colidiuCom(tile)) {
                    this.vy = 0;
                    this.y = tile.y - tile.height / 2 - this.height / 2 - 1;
                }
            }
        }
    }

    aplicaRestricoesCima(pmx, pmy) {
        const SIZE = this.cena.mapa.SIZE;
        if (this.vy < 0) {
            if (this.cena.mapa.tiles[pmy][pmx] != 0) {
                const tile = {
                    x: pmx * SIZE + SIZE / 2,
                    y: pmy * SIZE + SIZE / 2,
                    width: SIZE,
                    height: SIZE,
                };
                this.cena.ctx.strokeStyle = "white";
                this.cena.ctx.strokeRect(
                    tile.x - SIZE / 2,
                    tile.y - SIZE / 2,
                    SIZE,
                    SIZE
                );
                if (this.colidiuCom(tile)) {
                    this.vy = 0;
                    this.y = tile.y + tile.height / 2 + this.height / 2 + 1;
                }
            }
        }
    }
}
