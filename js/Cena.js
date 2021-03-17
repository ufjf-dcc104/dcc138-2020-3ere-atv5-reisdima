import Sprite from "./Sprite.js";

export default class Cena {
    /**
        É responsável por desenhar elementos na tela
        em uma animação.
     */
    constructor(canvas, assets = null) {
        this.canvas = canvas;
        this.game = null;
        this.ctx = canvas.getContext("2d");
        this.sprites = [];
        this.aRemover = [];
        this.t0 = 0;
        this.dt = 0;
        this.idAnim = null;
        this.assets = assets;
        this.mapa = null;
        this.spawnTimer = 0;
        this.spawnWaitTime = 4;
    }

    desenhar() {
        this.ctx.fillStyle = "lightblue";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.mapa?.desenhar(this.ctx);
        if (this.assets.acabou()) {
            for (let s = 0; s < this.sprites.length; s++) {
                const sprite = this.sprites[s];
                sprite.desenhar(this.ctx);
                sprite.aplicaRestricoes();
            }
        }
        this.ctx.fillStyle = "yellow";
        this.ctx.fillText(this.assets?.progresso(), 10, 20);
    }

    adicionar(sprite) {
        sprite.cena = this;
        this.sprites.push(sprite);
    }

    passo(dt) {
        if (this.assets.acabou()) {
            for (const sprite of this.sprites) {
                sprite.passo(dt);
            }
        }
    }

    quadro(t) {
        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0) / 1000;
        this.spawnTimer += this.dt;
        if(this.spawnTimer >= this.spawnWaitTime){
            // this.criaSpriteAleatorio();
            this.spawnTimer = 0;
        }
        this.passo(this.dt);
        this.desenhar();
        this.checaColisao();
        this.removerSprites();
        this.iniciar();
        this.t0 = t;
    }

    iniciar() {
        this.idAnim = requestAnimationFrame((t) => this.quadro(t));
    }

    parar() {
        cancelAnimationFrame(this.idAnim);
        this.t0 = null;
        this.dt = 0;
    }

    checaColisao() {
        for (let a = 0; a < this.sprites.length - 1; a++) {
            const spriteA = this.sprites[a];
            for (let b = a + 1; b < this.sprites.length; b++) {
                const spriteB = this.sprites[b];
                if (spriteA.colidiuCom(spriteB)) {
                    this.quandoColidir(spriteA, spriteB);
                }
            }
        }
    }

    quandoColidir(a, b) {
        if (!this.aRemover.includes(a)) {
            this.aRemover.push(a);
        }
        if (!this.aRemover.includes(b)) {
            this.aRemover.push(b);
        }
        this.assets.play("boom");
    }

    removerSprites() {
        for (const alvo of this.aRemover) {
            const index = this.sprites.indexOf(alvo);
            if (index >= 0) {
                this.sprites.splice(index, 1);
            }
        }
        this.aRemover = [];
    }

    configuraMapa(mapa) {
        this.mapa = mapa;
        this.mapa.cena = this;
    }

    // criaSpriteAleatorio() {
    //     let mx = 0;
    //     let my = 0;
    //     let l = 0;
    //     let c = 0;
    //     try {
    //         while (this.mapa.tiles[l][c] !== 0) {
    //             c = Math.floor(Math.random() * this.mapa.COLUNAS);
    //             l = Math.floor(Math.random() * this.mapa.LINHAS);
    //         }
    //         mx = c * this.mapa.SIZE + this.mapa.SIZE / 2;
    //         my = l * this.mapa.SIZE + this.mapa.SIZE / 2;
    //         let behavior = Math.floor(Math.random() * 4);
    //         let vx = 0;
    //         let vy = 0;
    //         switch (behavior) {
    //             case 0:
    //                 vx = 10;
    //                 break;
    //             case 1:
    //                 vx = -10;
    //                 break;
    //             case 2:
    //                 vy = 10;
    //                 break;
    //             case 3:
    //                 vy = -10;
    //                 break;
    //             default:
    //                 break;
    //         }
    //         const sprite = new Sprite({ x: mx, y: my, color: "red", vx, vy });
    //         this.adicionar(sprite);
    //     } catch (error) {
    //         console.log("c: " + c);
    //         console.log("l: " + l);
    //         console.log(this.mapa.tiles);
    //         console.log(error);
    //     }
    // }
}
