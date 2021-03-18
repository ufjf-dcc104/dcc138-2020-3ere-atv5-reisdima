import Cena from "./Cena.js";
import Sprite from "../Sprite.js";
import Mapa from "../Mapa.js";
import { mapa1 as modeloMapa1 } from "../../maps/mapa1.js";

export default class CenaFase1 extends Cena {
    quandoColidir(a, b) {
        if (a.tags.has("pc") && b.tags.has("enemy")) {
            if (!this.aRemover.includes(a)) {
                this.aRemover.push(a);
            }
            if (!this.aRemover.includes(b)) {
                this.aRemover.push(b);
            }
            this.assets.play("boom");
            this.rodando = false;
            this.game.selecionaCena("fim");
            return;
        }
        if (a.tags.has("enemy") && b.tags.has("enemy")) {
            if (!this.aRemover.includes(a)) {
                this.aRemover.push(a);
            }
            if (!this.aRemover.includes(b)) {
                this.aRemover.push(b);
            }
            this.assets.play("boom");
            return;
        }
        if (a.tags.has("pc") && b.tags.has("coin")) {
            if (!this.aRemover.includes(b)) {
                this.aRemover.push(b);
            }
            this.moedasColetadas += 1;
            this.assets.play("coin");
        }
    }

    quadro(t) {
        super.quadro(t);
        this.spawnTimer += this.dt;
        if (this.spawnTimer >= this.spawnWaitTime) {
            this.criarInimigoAleatorio();
            this.spawnTimer = 0;
        }
    }

    preparar() {
        super.preparar();
        this.pc = null;
        this.spawnTimer = 0;
        this.spawnWaitTime = 4;
        this.moedasTotais = 4;
        this.moedasColetadas = 0;
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
        this.pc = pc;
        this.adicionar(pc);

        this.criarInimigoAleatorio();
        this.criarInimigoAleatorio();
        this.criarInimigoAleatorio();
        for (let i = 0; i < this.moedasTotais; i++) {
            this.criaMoedaAleatoria();
        }
    }

    criaMoedaAleatoria() {
        try {
            let posicao = { ...this.obterPosicaoVazia() };
            const sprite = new Sprite({
                x: posicao.mx,
                y: posicao.my,
                tags: ["coin"],
                image: "coin",
            });
            this.adicionar(sprite);
        } catch (error) {
            console.log(error);
        }
    }

    criarInimigoAleatorio() {
        try {
            let posicao = { ...this.obterPosicaoVazia() };
            let pc = this.pc;
            function perseguePC(dt) {
                this.vx = 15 * Math.sign(pc.x - this.x);
                this.vy = 15 * Math.sign(pc.y - this.y);
            }
            const sprite = new Sprite({
                x: posicao.mx,
                y: posicao.my,
                color: "red",
                controlar: perseguePC,
                tags: ["enemy"],
            });
            this.adicionar(sprite);
        } catch (error) {
            console.log("c: " + c);
            console.log("l: " + l);
            console.log(this.mapa.tiles);
            console.log(error);
        }
    }

    obterPosicaoVazia() {
        let mx = 0;
        let my = 0;
        let l = 0;
        let c = 0;
        while (this.mapa.tiles[l][c] !== 0) {
            c = Math.floor(Math.random() * this.mapa.COLUNAS);
            l = Math.floor(Math.random() * this.mapa.LINHAS);
        }
        mx = c * this.mapa.SIZE + this.mapa.SIZE / 2;
        my = l * this.mapa.SIZE + this.mapa.SIZE / 2;
        return { mx, my };
    }
}
