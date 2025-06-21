import { Juego } from '../clases/juego'
import { User } from './Usuario';

export class JuegoCaraoceca extends Juego {

    suerte:any;
    public verificar(): boolean {
        throw new Error('Method not implemented.');
    }
    monedas = [
        {
            name: "cara",
            img: "../../../assets/images/cara.png",
            id: 1,
            isTouched: false,

        },
        {
            name: "ceca",
            img: "../../../assets/images/ceca.png",
            id: 2,
            isTouched: false,
        }
    ];
    public monedaSeleccionada:any;

    constructor(jugador?:User) {
        super(null,'Cara o Ceca',null,jugador);
    }

    mezclarMonedas(){
        /* this.monedas.sort(function () { return Math.random() - 0.5 }); */
    }

    elegirMoneda(moneda){
        this.monedaSeleccionada = moneda;
    }

    

}
