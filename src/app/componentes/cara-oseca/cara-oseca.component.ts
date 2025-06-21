import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { JuegosService } from '../../services/juegos.service';
import { CommonModule } from '@angular/common';
import { Juego } from '../../clases/juego';
// import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-cara-oseca',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cara-oseca.component.html',
  styleUrl: './cara-oseca.component.css',
  // animations: [
  //   trigger('cardState', [
  //     state(
  //       'spin',
  //       style({
  //         transform: 'rotateY(1080deg) rotateZ(0deg)',
  //       })
  //     ),
  //     state(
  //       'blank',
  //       style({
  //       })
  //     ),
  //     transition('* => *', animate('1000ms ease')),
  //   ]),
  // ],
})
export class CaraOSecaComponent {


  caraoceca: any = {
    gano: false,
    suerte: 0,
    monedas: [
      {
        name: "cara",
        img: "/images/cara.png",
        id: 1,
        isTouched: false,

      },
      {
        name: "ceca",
        img: "images/ceca.png",
        id: 2,
        isTouched: false,
      }
    ],
    monedaSeleccionada: null,
  };
  suerte: number = 0;
  progressbar: any;
  isPlaying = false; //cambia entre menu y el juego
  selecciono = false; // validar si selecciono (disable jugar)
  lanzoMoneda = false; //booleano para animacion
  isSpining = false; //si esta girando no muestro la moneda
  monedaActual: any; //moneda que se muestra
  constructor(
    private authService: AuthService,
    private juegoService: JuegosService
  ) {
    // this.caraoceca = new JuegoCaraoceca(this.jugadoresService.jugador);
  }

  ngOnInit(): void {
  }
  /**devulve true si gano, false si perdio*/
  verificar() {
    /* Probabilidad segun la regla de Laplace P(A)= numeroDeCasosFavorablesaA/numerosDeCasosPosibles*/
    var gano = false;
    var casosFavorables = new Array<any>();
    for (var i = 0; i < this.suerte; i++) {
      casosFavorables.push(Math.floor(Math.random() * 100));
    }
    var numeroGanador = Math.floor(Math.random() * 100); //casos posibles 100

    casosFavorables.forEach((minumero) => {
      if (minumero == numeroGanador) {
        gano = true;
      }
    });
    return gano;
  }
  aumentarProbabilidad(bar: HTMLElement) {
    this.suerte += 1;
    bar.style.height = this.suerte.toString() + '%';
  }
  lanzarMoneda(bar: HTMLElement) {
    // hacer girar 
    this.isSpining = true;
    this.lanzoMoneda = !this.lanzoMoneda;
    if (this.verificar() == true) {
      //Gano
      this.caraoceca.suerte = this.suerte;
      this.caraoceca.gano = true;
      this.monedaActual = this.caraoceca.monedaSeleccionada.img;
      setTimeout(() => {
        this.isPlaying = false;
      }, 2000);
      this.guardarJuego(true);

    } else {
      this.mostrarMonedaActual();
      this.aumentarProbabilidad(bar);
    }
    setTimeout(() => {
      this.isSpining = false;
    }, 1000);
  }

  mostrarMonedaActual() {
    if (this.caraoceca.monedaSeleccionada == this.caraoceca.monedas[0]) {
      this.monedaActual = this.caraoceca.monedas[1].img;
    } else {
      this.monedaActual = this.caraoceca.monedas[0].img;
    }
  }

  jugar() {
    this.monedaActual = this.caraoceca.monedaSeleccionada.img;
    this.isPlaying = true;
  }
  reiniciar() {
    this.suerte = 0;
    this.isPlaying = true;
  }
  seleccionarCara(indexMoneda: number) {
    if (indexMoneda == 0) {
      this.caraoceca.monedas[0].isTouched = true;
      this.caraoceca.monedas[1].isTouched = false;
    } else {
      this.caraoceca.monedas[0].isTouched = false;
      this.caraoceca.monedas[1].isTouched = true;
    }
    this.selecciono = true;
    this.caraoceca.monedaSeleccionada = this.caraoceca.monedas[indexMoneda];
  }

  guardarJuego(gano: boolean) {
    var juego = new Juego(this.authService.usuario);
    juego.resultado = "Gano con una probabilidad del " + (this.suerte).toString()+ "%";
    juego.nombreJuego = "Cara o Seca";
    juego.fecha = new Date().toLocaleDateString();
    this.juegoService.addJuego(juego).then(() => {
      console.log("Guardado---")
    });
  }

}
