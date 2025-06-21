import { Juego } from '../clases/juego'

export class JuegoAhorcado extends Juego {

    suerte:any;
    public verificar(): boolean {
        throw new Error('Method not implemented.');
    }

    constructor(jugador?:string, gano?:string) {
        super(undefined, 'Ahorcado', gano , jugador);
    }    

}
