import AssetManager from "./AssetsManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import {mapa1 as modeloMapa1} from "../maps/mapa1.js"

const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaImagem("orc", "assets/orc.png");
assets.carregaAudio("coin", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");


document.body.appendChild(assets.img("garota"));
document.body.appendChild(assets.img("esqueleto"));
document.body.appendChild(assets.img("orc"));

const canvas = document.querySelector("canvas");
canvas.width = 14*32;
canvas.height = 10*32
const ctx = canvas.getContext("2d");
const cena1 = new Cena(canvas, assets);

const mapa1 = new Mapa(10, 14, 32);
mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);

const pc = new Sprite({vx: 10, x: 50, y: 90});
const en1 = new Sprite({ x: 140, y: 100, color: "red", vx: 0 });
const en2 = new Sprite({ x: 115, y: 40, color: "red", vy: 10 });
const en3 = new Sprite({ x: 115, y: 160, color: "red", vy: -10 });

cena1.adicionar(pc);
cena1.adicionar(en1);
cena1.adicionar(en2);
cena1.adicionar(en3);
cena1.iniciar();

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "s":
            cena1.iniciar();
            break;
        case "S":
            cena1.parar();
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
