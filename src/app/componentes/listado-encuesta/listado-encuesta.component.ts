import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EncuestaService } from '../../services/encuesta.service';

@Component({
  selector: 'app-listado-encuesta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-encuesta.component.html',
  styleUrl: './listado-encuesta.component.css'
})
export class ListadoEncuestaComponent {
listado: any;
  
  constructor(private encuestaService: EncuestaService) {
    this.listado = [];
  }

  ngOnInit(): void {
    this.obtenerListado();
  }

  obtenerListado(): void {
    this.encuestaService.getEncuestas().then((data) => {
      this.listado = data;
    });
  }

}
