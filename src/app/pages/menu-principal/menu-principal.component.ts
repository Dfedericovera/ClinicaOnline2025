import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from "../../componentes/carousel/carousel.component";
import { FooterComponent } from "../../componentes/footer/footer.component";
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [CarouselComponent, FooterComponent],
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.sass']
})
export class MenuPrincipalComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
