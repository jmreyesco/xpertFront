import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Breed, BreedImage } from '../models/breed.model';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private apiUrl = 'http://localhost:4201/api';

  constructor(private http: HttpClient) { }

  // Obtener todas las razas de gatos
  getBreeds(): Observable<{ razas: Breed[] }> {
    return this.http.get<{ razas: Breed[] }>(`${this.apiUrl}/breeds`);
  }

  // Obtener información de una raza específica
  getBreedById(id: string): Observable<{ raza: Breed }> {
    return this.http.get<{ raza: Breed }>(`${this.apiUrl}/breeds/${id}`);
  }

  // Obtener imágenes de una raza específica
  getBreedImages(id: string): Observable<{ imagenes: BreedImage[] }> {
    return this.http.get<{ imagenes: BreedImage[] }>(`${this.apiUrl}/breeds/${id}/images`);
  }

  // Buscar razas por nombre, temperamento u origen
  searchBreeds(searchTerm: string): Observable<{ razas: Breed[], total: number }> {
    return this.http.get<{ razas: Breed[], total: number }>(`${this.apiUrl}/breeds/search?name=${searchTerm}`);
  }
}
