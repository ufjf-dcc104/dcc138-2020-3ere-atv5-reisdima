import AssetManager from "./AssetsManager.js";
import Cena from "./Cena.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";

const assets = new AssetManager();

assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaImagem("orc", "assets/orc.png");
assets.carregaAudio("coin", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");

const mixer = new Mixer(10);

document.body.appendChild(assets.img("garota"));
document.body.appendChild(assets.img("esqueleto"));
document.body.appendChild(assets.img("orc"));

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const cena1 = new Cena(canvas, assets);

const pc = new Sprite({ vx: 10 });
const en1 = new Sprite({ x: 140, y: 100, w: 30, h: 30, color: "red" });

cena1.adicionar(pc);
cena1.adicionar(en1);
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
            mixer.play(assets.audio("coin"));
            break;
        case "b":
            mixer.play(assets.audio("boom"));
            break;
        default:
            break;
    }
});
