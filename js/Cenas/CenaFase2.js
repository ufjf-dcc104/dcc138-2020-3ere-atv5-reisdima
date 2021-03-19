import Mapa from "../Mapa.js";
import { mapa2 as modeloMapa2 } from "../../maps/mapa2.js";
import CenaJogo from "./CenaJogo.js";

export default class CenaFase2 extends CenaJogo {

    preparar() {
        super.preparar();
        const mapa2 = new Mapa(10, 14, 32);
        mapa2.carregaMapa(modeloMapa2);
        this.configuraMapa(mapa2);
    }

}
