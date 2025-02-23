import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ChampionImgService } from '../../services/champion-img.service';

@Component({
  selector: 'app-bottom-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bottom-form.component.html',
  styleUrl: './bottom-form.component.css'
})
export class BottomFormComponent {
  role: 'adc' | 'supp' = 'adc';

  // 🔹 Formulario Reactivo
  searchForm: FormGroup;

  results: any[] = [];
  championImage: string | null = null;

  constructor(
      private _apiService: ApiService, 
      private _championService: ChampionImgService) {
    // Inicializamos el formulario reactivo
    this.searchForm = new FormGroup({
      searchQuery: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  // Cambia el rol entre ADC y Support
  setRole(newRole: 'adc' | 'supp') {
    this.role = newRole;
  }

  // Realiza la búsqueda según el rol seleccionado
 // 🔹 Realiza la búsqueda y obtiene la imagen del campeón
 search(event: Event) {
  event.preventDefault(); // Evita la recarga de la página

  if (this.searchForm.invalid) {
    console.warn('El campo de búsqueda está vacío o no es válido.');
    return;
  }

  const searchQuery = this.searchForm.value.searchQuery.trim();
  console.log(`Buscando para ${this.role === 'adc' ? 'ADC' : 'Support'}:`, searchQuery);

  const apiCall$: Observable<any> =
    this.role === 'adc'
      ? this._apiService.getBestSupportsForAdc(searchQuery) // Para ADC
      : this._apiService.getBestAdcsForSupport(searchQuery); // Para Support

  apiCall$.subscribe({
    next: (response) => {
      console.log('Respuesta de la API:', response);
      this.results = response.best_supports || response.best_adcs;

      // 🔹 Obtener imagen del campeón
      this.championImage = this._championService.getChampionImage(searchQuery);
      console.log('URL de la imagen:', this.championImage);
    },
    error: (error) => {
      console.error('Error al obtener los datos:', error);
      this.championImage = null; // Reiniciar imagen si hay error
    }
  });
  }

    // Función para obtener la URL de la imagen de un campeón
    getChampionImage(championName: string): string {
      return this._championService.getChampionImage(championName);
    }
}