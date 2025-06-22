import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../../componentes/alert/alert.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './bienvenido.component.html',
  styleUrl: './bienvenido.component.css'
})
export class BienvenidoComponent {

}
