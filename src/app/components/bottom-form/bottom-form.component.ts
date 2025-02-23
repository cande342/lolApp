import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';

@Component({
  selector: 'app-bottom-form',
  imports: [CommonModule, ReactiveFormsModule, SearchComponent, ResultsComponent],
  templateUrl: './bottom-form.component.html',
  styleUrl: './bottom-form.component.css'
})
export class BottomFormComponent {
  role: 'adc' | 'supp' = 'adc';
  results: any[] = [];
  championImage: string | null = null;

  @ViewChild(SearchComponent) searchComponent!: SearchComponent;
  @ViewChild(ResultsComponent) resultsComponent!: ResultsComponent;

  // Método para cambiar el rol
  setRole(newRole: 'adc' | 'supp') {
    this.role = newRole;
  }

  // Método para recibir los resultados del componente hijo "search"
  onSearchResults(results: any[], championImage: string | null) {
    this.results = results;
    this.championImage = championImage;
  }

  clearSearchAndResults() {
    this.searchComponent.clearSearch(); // Limpia el formulario de búsqueda
    this.resultsComponent.clearResults(); // Limpia los resultados
  }
}