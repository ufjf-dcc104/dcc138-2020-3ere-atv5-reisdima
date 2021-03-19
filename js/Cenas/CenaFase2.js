import Mapa from "../Mapa.js";
import { mapa2 as modeloMapa2 } from "../../maps/mapa2.js";
import CenaJogo from "./CenaJogo.js";

export default class CenaFase2 extends CenaJogo {

    quandoColidir(a, b) {
        super.quandoColidir(a, b);
        if (a.tags.has("pc") && b.tags.has("coin")) {
            if (!this.aRemover.includes(b)) {
                this.aRemover.push(b);
            }
            this.game.moedasColetadas += 1;
            this.moedasColetadasFase += 1;
            if(this.moedasColetadasFase === this.moedasTotais){
                this.game.selecionaCena("fase1");
            }
            this.assets.play("coin");
        }
    }

    preparar() {
        super.preparar();
        const mapa2 = new Mapa(10, 14, 32);
        mapa2.carregaMapa(modeloMapa2);
        this.configuraMapa(mapa2);
    }

}
