import { Component, Input } from '@angular/core';
import { JuegosService } from '../../services/juegos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-resultados.component.html',
  styleUrl: './listado-resultados.component.css'
})
export class ListadoResultadosComponent {

  @Input()
  listado: Array<any> | undefined;


  constructor(private juegosService: JuegosService) {

    
    this.juegosService.subscribeJuegos().subscribe((value: any) => {
      console.log("Cambios recibidos:", value);

      this.juegosService.getJuegos().then((listado: any) => {
        this.listado = listado;
      });
      console.log('Posts actualizados:', value);
      this.listado = value;
    });
  }

  ngOnInit() {
    this.TraerTodos();
  }

  TraerTodos() {
    this.juegosService.getJuegos().then((listado: any) => {
      console.log("Listado de juegos inicial:", listado);
      
      this.listado = listado;
    });
  }

  TraerGanadores() {
    //  this.listado = this.juegosService.juegos;
    //  this.listado = this.listado.filter((juego:Juego)=>{
    //    if(juego.gano == true||juego instanceof JuegoMemotest || juego instanceof JuegoCaraoceca){
    //      return juego
    //    }
    //  })
  }

  TraerPerdedores() {
    //  this.listado = this.juegosService.juegos;
    //  this.listado = this.listado.filter((juego:Juego)=>{
    //    if(juego.gano == false){
    //      return juego
    //    }
    //  })
  }

}
