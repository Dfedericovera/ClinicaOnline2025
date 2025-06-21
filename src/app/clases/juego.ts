
export class Juego
{
  public id: string | undefined;
  public nombreJuego = 'Sin Nombre';
  public jugador: string | undefined;
  public fecha: any
  public hora: any;
  public date
  public resultado;

  constructor(id?: string, nombreDelJuego?: string, resultado?: string, jugador?: string)
  {
    this.date = Date.now();
    if (nombreDelJuego)
      this.nombreJuego = nombreDelJuego;
    if (id)
      this.id = id;
    if (resultado)
      this.resultado = resultado;
    if (jugador)
      this.jugador = jugador;
  }







}
