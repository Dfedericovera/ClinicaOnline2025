import { Juego } from '../clases/juego'

export class JuegoPreguntados extends Juego {

    aciertos:any;
    public verificar(): boolean {
        throw new Error('Method not implemented.');
    }

    constructor(jugador?: string) {
        super(undefined, 'Preguntados', undefined, jugador);
    }    

}