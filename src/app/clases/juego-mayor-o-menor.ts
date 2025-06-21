import { Juego } from '../clases/juego'

export class JuegoMayorOMenor extends Juego {

    aciertos:any;
    public verificar(): boolean {
        throw new Error('Method not implemented.');
    }

    constructor(jugador?:string) {
        super(undefined, 'Mayor o Menor', undefined, jugador);
    }    

}