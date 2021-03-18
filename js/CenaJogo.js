import Cena from "./Cena.js";
import Sprite from "./Sprite.js";
import Mapa from "./Mapa.js";
import { mapa1 as modeloMapa1 } from "../maps/mapa1.js";

export default class CenaJogo extends Cena {
    quandoColidir(a, b) {
        if (!this.aRemover.includes(a)) {
            this.aRemover.push(a);
        }
        if (!this.aRemover.includes(b)) {
            this.aRemover.push(b);
        }
        this.assets.play("boom");
        if (a.tags.has("pc") && b.tags.has("enemy")) {
            this.rodando = false;
            this.game.selecionaCena("fim");
        }
    }

    preparar() {
        super.preparar();
        const mapa1 = new Mapa(10, 14, 32);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);

        const pc = new Sprite({ vx: 0, x: 50, y: 90 });
        pc.tags.add("pc");
        const cena = this;
        pc.controlar = function (dt) {
            if (cena.input.comandos.get("MOVE_ESQUERDA")) {
                this.vx = -50;
            } else if (cena.input.comandos.get("MOVE_DIREITA")) {
                this.vx = 50;
            } else {
                this.vx = 0;
            }
            if (cena.input.comandos.get("MOVE_CIMA")) {
                this.vy = -50;
            } else if (cena.input.comandos.get("MOVE_BAIXO")) {
                this.vy = 50;
            } else {
                this.vy = 0;
            }
        };
        this.adicionar(pc);

        function perseguePC(dt) {
            this.vx = 15 * Math.sign(pc.x - this.x);
            this.vy = 15 * Math.sign(pc.y - this.y);
        }
        // const en1 = new Sprite({ x: 140, y: 100, color: "red", perseguePC });
        // const en2 = new Sprite({ x: 115, y: 40, color: "red", perseguePC });
        // const en3 = new Sprite({ x: 115, y: 160, color: "red", perseguePC });
        const en1 = new Sprite({
            x: 145,
            y: 110,
            color: "red",
            controlar: perseguePC,
            tags: ["enemy"],
        });
        const en2 = new Sprite({
            x: 115,
            y: 45,
            color: "red",
            controlar: perseguePC,
            tags: ["enemy"],
        });
        const en3 = new Sprite({
            x: 145,
            y: 160,
            color: "red",
            controlar: perseguePC,
            tags: ["enemy"],
        });
        this.adicionar(en1);
        this.adicionar(en2);
        this.adicionar(en3);

        // this.criaSpriteAleatorio();
        // this.criaSpriteAleatorio();
        // this.criaSpriteAleatorio();
        // this.criaSpriteAleatorio();
        // criaSpriteAleatorio();
    }
}
