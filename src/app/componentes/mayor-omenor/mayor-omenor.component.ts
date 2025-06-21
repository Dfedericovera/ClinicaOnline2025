import { Component } from '@angular/core';
import { JuegosService } from '../../services/juegos.service';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { JuegoMayorOMenor } from '../../clases/juego-mayor-o-menor';

@Component({
  selector: 'app-mayor-omenor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayor-omenor.component.html',
  styleUrl: './mayor-omenor.component.css'
})
export class MayorOMenorComponent {

    mazo = ['https://bonosdeapuesta-media.s3.eu-west-3.amazonaws.com/wp-content/uploads/2021/05/01221403/carta-de-poker.png',
    'https://bonosdeapuesta-media.s3.eu-west-3.amazonaws.com/wp-content/uploads/2021/05/05000324/juego-de-carta.png',
    'https://cdn.pixabay.com/photo/2015/08/11/11/56/hearts-884154_1280.png',
    'https://ih1.redbubble.net/image.657032572.8138/raf,750x1000,075,t,FFFFFF:97ab1c12de.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_club_5.svg/819px-Playing_card_club_5.svg.png',
    'https://media.istockphoto.com/photos/playing-card-six-of-spades-picture-id157077165?k=20&m=157077165&s=170667a&w=0&h=6MU5Q5QezBMDEU2l1S6WR3nMznMBjmZWOhWXSj5KLG8=',
    'http://2.bp.blogspot.com/_wG8RymXSv5U/TFTrSQNijFI/AAAAAAAAAIE/avzE21jpnqg/s320/Seven+of+Diamonds.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_heart_8.svg/1638px-Playing_card_heart_8.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Playing_card_spade_9.svg/614px-Playing_card_spade_9.svg.png',
    'https://w7.pngwing.com/pngs/430/69/png-transparent-playing-card-ace-of-spades-card-game-standard-52-card-deck-ace-card-love-game-text-thumbnail.png',
    'https://w7.pngwing.com/pngs/433/896/png-transparent-jack-playing-card-spades-valet-de-pique-card-game-cards-game-text-logo-thumbnail.png',
    'https://e7.pngegg.com/pngimages/160/725/png-clipart-queen-of-hearts-playing-card-king-playing-cards-queen-of-hearts-playing-card-king-hearts-thumbnail.png',
    'https://w7.pngwing.com/pngs/612/716/png-transparent-contract-bridge-poker-playing-card-card-game-suit-king-miscellaneous-game-king-thumbnail.png']
  indice = Math.floor(Math.random() * 12);
  cartaActual = this.mazo[this.indice];
  aciertos = 0;
  gameOver = false;


  constructor(private juegoService: JuegosService,
    private authService: AuthService) { }

  ngOnInit(): void
  {

  }

  comprobar(eleccion: string)
  {

    var nuevoIndice = Math.floor(Math.random() * 12);
    if (eleccion == 'mayor' && nuevoIndice > this.indice)
    {
      //gano
      this.aciertos++; 
    }
    else if (eleccion == 'menor' && nuevoIndice < this.indice)
    {
      //gano
      this.aciertos++; 
    }
    else
    {
      //perdio
      this.gameOver = true;
      this.guardarJuego(this.aciertos);
    }
    this.indice = nuevoIndice;
    this.cartaActual = this.mazo[this.indice];
  }
  reiniciar()
  {
    this.aciertos = 0;
    this.gameOver = false;

  }

  guardarJuego(aciertos: number)
  {
    var juego = new JuegoMayorOMenor(this.authService.usuario);
    juego.aciertos = aciertos.toString();
    juego.resultado = "Aciertos: " + aciertos.toString();
    juego.fecha = new Date().toLocaleDateString();
    this.juegoService.addJuego(juego).then(() =>
    {
      console.log("Guardado---")
    });
  }

}
