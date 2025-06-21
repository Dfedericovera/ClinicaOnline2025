import { Component } from '@angular/core';
import { JuegosService } from '../../services/juegos.service';
import { AuthService } from '../../services/auth-service.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { JuegoPreguntados } from '../../clases/juego-preguntados';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {


  gameOver: boolean = false;
  gato: any;
  opciones: Array<string> = [];
  aciertos = 0;

  constructor(
    private apiService: ApiService,
    private juegoService: JuegosService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.cargarRespuesta();

  }

  cargarRespuesta() {
    this.apiService.getGato().subscribe((respuesta: any) => {
      this.apiService.getGatoById(respuesta[0].id).subscribe((gato: any) => {
        this.gato = {
          id: respuesta[0].id,
          url: respuesta[0].url,
          name: gato[0].name,
        };
        console.log(this.gato);
        this.cargarOpciones();
        
      });
    })
  }

  cargarOpciones() {
    this.opciones.push(this.gato.name);
    for (let i = 0; i < 3; i++) {
      this.cargarOpcion();
    }

  }

  cargarOpcion() {

    this.apiService.getGato().subscribe((respuesta: any) => {
      this.apiService.getGatoById(respuesta[0].id).subscribe((gato: any) => {
        this.opciones.push(gato[0].name);
        console.log(this.opciones,this.opciones.length);
    
          this.mezclarArray(this.opciones);
      })
    });
    
  }


  comprobar(respuesta: any) {
    if (respuesta == this.gato.name) {
      console.log("GANO");
      this.aciertos++;
      this.cargarRespuesta();
    this.opciones = [];

    }
    else {
      console.log("Perdio");
      this.gameOver = true;
      this.guardarJuego(this.aciertos);
    this.opciones = [];

    }
  }

  reiniciar() {
    this.cargarRespuesta();
    this.gameOver = false;
    this.aciertos = 0;
  }

  mezclarArray(array: Array<any>) {
    var n = array.length, i = -1, j;
    console.log(n);
    
    var t;
    while (++i < n) {
      j = Math.floor(Math.random() * n);
      t = array[j];
      array[j] = array[i];
      array[i] = t;
    }
  }

  guardarJuego(aciertos: number) {
    var juego = new JuegoPreguntados(this.authService.usuario);
    juego.aciertos = aciertos.toString();
    juego.resultado = "Aciertos: " + aciertos.toString();
    juego.fecha = new Date().toLocaleDateString();
    this.juegoService.addJuego(juego).then(() =>
    {
      console.log("Guardado---")
    });
  }


}
