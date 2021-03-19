import Mapa from "../Mapa.js";
import { mapa1 as modeloMapa1 } from "../../maps/mapa1.js";
import CenaJogo from "./CenaJogo.js";

export default class CenaFase1 extends CenaJogo {

    quandoColidir(a, b) {
        super.quandoColidir(a, b);
        if (a.tags.has("pc") && b.tags.has("coin")) {
            if (!this.aRemover.includes(b)) {
                this.aRemover.push(b);
            }
            this.moedasColetadas += 1;
            this.moedasColetadasFase += 1;
            if(this.moedasColetadasFase === this.moedasTotais){
                this.game.selecionaCena("fase2");
            }
            this.assets.play("coin");
        }
    }

    preparar() {
        super.preparar();
        const mapa1 = new Mapa(10, 14, 32);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);
    }

}
