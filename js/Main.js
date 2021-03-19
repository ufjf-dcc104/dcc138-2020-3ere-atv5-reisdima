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

assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaImagem("grass", "assets/grass.png");
assets.carregaImagem("coin", "assets/coin.png");
assets.carregaImagem("water", "assets/water.png");
assets.carregaAudio("coin", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");
assets.carregaAnimacao("player", "assets/player.png");
assets.carregaAnimacao("orc", "assets/orc.png");

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
