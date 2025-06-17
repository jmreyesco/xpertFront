import { Component, OnInit } from '@angular/core';
import { CatService } from '../../services/cat.service';
import { Breed } from '../../models/breed.model';

@Component({
  selector: 'app-breed-table',
  templateUrl: './breed-table.component.html',
  styleUrls: ['./breed-table.component.scss']
})
export class BreedTableComponent implements OnInit {
  breeds: Breed[] = [];
  filteredBreeds: Breed[] = [];
  searchTerm: string = '';
  loading = false;

  constructor(private catService: CatService) { }

  ngOnInit(): void {
    this.loadAllBreeds();
  }

  loadAllBreeds(): void {
    this.loading = true;
    this.catService.getBreeds().subscribe(
      response => {
        this.breeds = response.razas;
        this.filteredBreeds = [...this.breeds];
        this.loading = false;
      },
      error => {
        console.error('Error al cargar razas:', error);
        this.loading = false;
      }
    );
  }

  searchBreeds(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredBreeds = [...this.breeds];
      return;
    }

    this.loading = true;
    this.catService.searchBreeds(this.searchTerm).subscribe(
      response => {
        this.filteredBreeds = response.razas;
        this.loading = false;
      },
      error => {
        console.error('Error al buscar razas:', error);
        this.loading = false;
      }
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredBreeds = [...this.breeds];
  }
}
