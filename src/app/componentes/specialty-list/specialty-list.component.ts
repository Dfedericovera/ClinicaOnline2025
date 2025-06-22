import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Especialidad } from '../../clases/especialidad';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specialty-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specialty-list.component.html',
  styleUrls: ['./specialty-list.component.sass']
})
export class SpecialtyListComponent implements OnInit {

  @Input() specialtys: Especialidad[] | undefined;
  @Output() chooseSpecialty: EventEmitter<Especialidad> = new EventEmitter<Especialidad>();


  constructor() { }

  ngOnInit(): void {
  }

  onChoose(specialty:Especialidad){
    this.chooseSpecialty.emit(specialty);
  }

}
