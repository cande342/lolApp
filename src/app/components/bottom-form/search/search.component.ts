import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ChampionImgService } from '../../../services/champion-img.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-search',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  @Input() role!: 'adc' | 'supp'; // Recibe el rol desde el padre
  @Output() searchResults = new EventEmitter<{ results: any[], championImage: string | null }>();

  searchForm: FormGroup;
  championImage: string | null = null; // Para almacenar la imagen del campeón buscado

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private _championService: ChampionImgService
  ) {
    this.searchForm = this.fb.group({
      searchQuery: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  // Método para realizar la búsqueda
  search(event: Event): void {
    event.preventDefault();

    if (this.searchForm.invalid) {
      console.warn('El campo de búsqueda está vacío o no es válido.');
      return;
    }

    const searchQuery = this.searchForm.value.searchQuery.trim();
    console.log(`Buscando para ${this.role === 'adc' ? 'ADC' : 'Support'}:`, searchQuery);

    // Obtener la imagen ANTES de llamar a la API
    this.championImage = this._championService.getChampionImage(searchQuery);
    console.log('URL de la imagen obtenida:', this.championImage);

    // Llamada a la API según el rol seleccionado
    const apiCall$: Observable<any> =
      this.role === 'adc'
        ? this._apiService.getBestSupportsForAdc(searchQuery)
        : this._apiService.getBestAdcsForSupport(searchQuery);

    apiCall$.subscribe({
      next: (response) => {
        console.log('Respuesta de la API:', response);
        const results = response.best_supports || response.best_adcs;

        // Emitimos los datos al componente padre
        this.searchResults.emit({ results, championImage: this.championImage });
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
        this.searchResults.emit({ results: [], championImage: null });
      }
    });
  }

  hasError(controlName: string, errorType: string): boolean {
    return this.searchForm.get(controlName)?.hasError(errorType) ?? false;
  }
  
  clearSearch() {
    this.searchForm.reset();
  }
}