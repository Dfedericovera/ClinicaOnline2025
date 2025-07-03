import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Professional } from '../../clases/professional';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { ApprovedPipe } from '../../pipes/approved.pipe';
import { ResaltarHabilitadoDirective } from '../../directives/resaltar-habilitado.directive';

@Component({
  selector: 'app-professional-list',
  standalone: true,
  imports: [CommonModule, ApprovedPipe, ResaltarHabilitadoDirective],
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.sass']
})
export class ProfessionalListComponent implements OnInit
{

  @Input() professionals: Professional[] = [];
  @Output() chooseProfessional: EventEmitter<Professional> = new EventEmitter<Professional>();
  spinner: boolean;
  @Input() isAdministrator: boolean = false;
  user$:Subscription = new Subscription();


  constructor(
    private authService: AuthService,
  )
  {
    this.spinner = false;
  }

  ngOnInit(): void
  {
  }

  ngOnDestroy(){
    this.user$.unsubscribe();
  }


  onChoose(specialty: any)
  {
    this.chooseProfessional.emit(specialty);
  }

  approveProfessional(professional: Professional)
  {
    this.spinner = true;
    console.log(professional);
    professional.approved = !professional.approved;
    this.authService.aprobarUsuario(professional.IdUsuario, professional.approved).then(value =>
    {
      console.log("Modificado correctamente");
      this.spinner = false;
    });
  }

}
