import Mapa from "../Mapa.js";
import { mapa1 as modeloMapa1 } from "../../maps/mapa1.js";
import CenaJogo from "./CenaJogo.js";

export default class CenaFase1 extends CenaJogo {

    preparar() {
        super.preparar();
        const mapa1 = new Mapa(10, 14, 32);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);
    }

}
