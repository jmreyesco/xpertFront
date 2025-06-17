import { Component, OnInit } from '@angular/core';
import { CatService } from '../../services/cat.service';
import { Breed, BreedImage } from '../../models/breed.model';

@Component({
  selector: 'app-breed-list',
  templateUrl: './breed-list.component.html',
  styleUrls: ['./breed-list.component.scss']
})
export class BreedListComponent implements OnInit {
  breeds: Breed[] = [];
  selectedBreed?: Breed;
  breedImages: BreedImage[] = [];
  loading = false;
  currentImageIndex = 0;

  constructor(private catService: CatService) { }

  ngOnInit(): void {
    this.loadBreeds();
  }

  loadBreeds(): void {
    this.loading = true;
    this.catService.getBreeds().subscribe(
      response => {
        this.breeds = response.razas;
        this.loading = false;
      },
      error => {
        console.error('Error al cargar razas:', error);
        this.loading = false;
      }
    );
  }

  onSelectBreed(event: Event): void {
    const breedId = (event.target as HTMLSelectElement).value;
    if (breedId) {
      this.loading = true;
      this.currentImageIndex = 0;
      
      // Cargar información detallada de la raza
      this.catService.getBreedById(breedId).subscribe(
        response => {
          this.selectedBreed = response.raza;
          this.loading = false;
        },
        error => {
          console.error('Error al cargar detalles de la raza:', error);
          this.loading = false;
        }
      );

      // Cargar imágenes de la raza
      this.catService.getBreedImages(breedId).subscribe(
        response => {
          this.breedImages = response.imagenes;
        },
        error => {
          console.error('Error al cargar imágenes:', error);
        }
      );
    } else {
      this.selectedBreed = undefined;
      this.breedImages = [];
    }
  }

  nextImage(): void {
    if (this.breedImages.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.breedImages.length;
    }
  }

  prevImage(): void {
    if (this.breedImages.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.breedImages.length) % this.breedImages.length;
    }
  }
}
