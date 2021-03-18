import AssetManager from "./AssetsManager.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaFase1 from "./Cenas/CenaFase1.js";
import CenaCarregando from "./Cenas/CenaCarregando.js";
import CenaFim from "./Cenas/CenaFim.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaImagem("orc", "assets/orc.png");
assets.carregaImagem("grass", "assets/grass.png");
assets.carregaImagem("water", "assets/water.png");
assets.carregaAudio("coin", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");

// document.body.appendChild(assets.img("garota"));
// document.body.appendChild(assets.img("esqueleto"));
// document.body.appendChild(assets.img("orc"));

const canvas = document.querySelector("canvas");
canvas.width = 14 * 32;
canvas.height = 10 * 32;

input.configurarTeclado({
    ArrowLeft: "MOVE_ESQUERDA",
    ArrowRight: "MOVE_DIREITA",
    ArrowUp: "MOVE_CIMA",
    ArrowDown: "MOVE_BAIXO",
    " ": "PROXIMA_CENA"
});

const game = new Game(canvas, assets, input);

const cenaCarregando = new CenaCarregando(canvas, assets);
const cenaFase1 = new CenaFase1(canvas, assets);
const cenaFim = new CenaFim(canvas, assets);
game.adicionarCena("carregando", cenaCarregando);
game.adicionarCena("jogo", cenaFase1);
game.adicionarCena("fim", cenaFim);



// cena1.iniciar();
game.iniciar();

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "s":
            game.iniciar();
            break;
        case "S":
            game.parar();
            break;
        case "c":
            assets.play("coin");
            break;
        case "b":
            assets.play("boom");
            break;
        default:
            break;
    }
});



function criaSpriteAleatorio() {
    let mx = 0;
    let my = 0;
    let l = 0;
    let c = 0;
    try {
        while (cena1.mapa.tiles[l][c] !== 0) {
            c = Math.floor(Math.random() * cena1.mapa.COLUNAS);
            l = Math.floor(Math.random() * cena1.mapa.LINHAS);
        }
        mx = c * cena1.mapa.SIZE + cena1.mapa.SIZE / 2;
        my = l * cena1.mapa.SIZE + cena1.mapa.SIZE / 2;
        let behavior = Math.floor(Math.random() * 4);
        let vx = 0;
        let vy = 0;
        switch (behavior) {
            case 0:
                vx = 10;
                break;
            case 1:
                vx = -10;
                break;
            case 2:
                vy = 10;
                break;
            case 3:
                vy = -10;
                break;
            default:
                break;
        }
        function perseguePC(dt){
            this.vx = 15 * Math.sign(pc.x - this.x);
            this.vy = 15 * Math.sign(pc.y - this.y);
        }
        const sprite = new Sprite({ x: mx, y: my, color: "red", vx, vy, perseguePC });
        cena1.adicionar(sprite);
    } catch (error) {
        console.log("c: " + c);
        console.log("l: " + l);
        console.log(this.mapa.tiles);
        console.log(error);
    }
}
