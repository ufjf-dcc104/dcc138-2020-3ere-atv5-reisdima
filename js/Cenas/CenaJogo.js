import Cena from "./Cena.js";
import Sprite from "../Sprite.js";
import { POSES as playerAnimation } from "../../animacoes/player.js";
import { POSES as orcAnimation } from "../../animacoes/orc.js";
import Animacao from "../Animacao.js";

export default class CenaJogo extends Cena {
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
    }

    quadro(t) {
        super.quadro(t);
        this.spawnTimer += this.dt;
        if (this.spawnTimer >= this.spawnWaitTime) {
            // this.criarInimigoAleatorio();
            this.spawnTimer = 0;
        }
    }

    preparar() {
        super.preparar();
        this.pc = null;
        this.inimigosInicias = this.inimigosInicias ? this.inimigosInicias+1 : 3;
        this.spawnTimer = 0;
        this.spawnWaitTime = 4;
        this.moedasTotais = 4;
        this.moedasColetadas = this.moedasColetadas ? this.moedasColetadas : 0;
        this.moedasColetadasFase = 0;

        let animacaoJogador = new Animacao({
            imagem: this.assets.animacao("player"),
            poses: playerAnimation,
            width: 32,
            height: 32,
        });
        const pc = new Sprite({
            vx: 0,
            x: 70,
            y: 110,
            animacao: animacaoJogador,
            w: 20,
            h: 20,
        });
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
            this.animacao.controlar(dt);
        };
        this.pc = pc;
        this.adicionar(pc);
        for (let i = 0; i < this.moedasTotais; i++) {
            this.criaMoedaAleatoria();
        }
        // for (let i = 0; i < this.inimigosInicias; i++) {
        //     this.criarInimigoAleatorio();
        // }
    }

    criaMoedaAleatoria() {
        try {
            let posicao = { ...this.obterPosicaoVazia() };
            const sprite = new Sprite({
                x: posicao.mx,
                y: posicao.my,
                tags: ["coin"],
                imagem: "coin",
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
                this.vx = 25 * Math.sign(pc.x - this.x);
                this.vy = 25 * Math.sign(pc.y - this.y);
                this.animacao.controlar(dt);
            }
            const animacaoOrc = new Animacao({
                imagem: this.assets.animacao("orc"),
                poses: orcAnimation,
                width: 32,
                height: 32,
            });
            const sprite = new Sprite({
                x: posicao.mx,
                y: posicao.my,
                color: "red",
                controlar: perseguePC,
                tags: ["enemy"],
                animacao: animacaoOrc,
            });
            this.adicionar(sprite);
        } catch (error) {
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
