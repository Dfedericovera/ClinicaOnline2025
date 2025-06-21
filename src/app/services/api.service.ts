import { Injectable } from '@angular/core';
import { PrincipalService } from './principal.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: PrincipalService) { }


  public listar() {
    return this.http.get("https://restcountries.eu/rest/v2/all")
  }

  public listarPerros() {
    return this.http.get("https://api.thedogapi.com/v1/images/search");
  }

  public getGato() {
    return this.http.get("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1")
  }

  public getGatoById(id: string) {
    return this.http.get(`https://api.thecatapi.com/v1/images/${id}/breeds`);
  } 
}
