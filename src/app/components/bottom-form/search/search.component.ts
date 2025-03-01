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

  @Input() role!: 'adc' | 'supp' | 'mid'; // Recibe el rol desde el padre
  @Output() searchResults = new EventEmitter<{ results: any[], championImage: string | null }>();

  searchForm!: FormGroup;
  championImage: string | null = null;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private _championService: ChampionImgService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchQuery: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  // Método para realizar la búsqueda
  search(event: Event): void {
    event.preventDefault();
    if (this.searchForm.invalid) return;
    this.formSubmitted = true;
    const searchQuery = this.searchForm.value.searchQuery.trim();
    this.championImage = this._championService.getChampionImage(searchQuery);

    let apiCall$: Observable<any>;

    switch (this.role) {
      case 'adc':
        apiCall$ = this._apiService.getBestSupportsForAdc(searchQuery);
        break;
      case 'supp':
        apiCall$ = this._apiService.getBestAdcsForSupport(searchQuery);
        break;
      case 'mid':
        apiCall$ = this._apiService.getBestCountersForMidChamp(searchQuery);
        break;
      default:
        console.warn('Rol no válido');
        return;
    }

    apiCall$.subscribe({
      next: (response) => {
        const results = response.best_supports || response.best_adcs || response.counters;
        this.searchResults.emit({ results, championImage: this.championImage });
      },
      error: (error) => {
        console.error('Error en la búsqueda:', error);
        this.searchResults.emit({ results: [], championImage: null });
      }
    });
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.searchForm.get(controlName);
    return (control?.hasError(errorType) && (this.formSubmitted || control.touched || control.dirty)) ?? false;
  }
  
  clearSearch() {
    this.searchForm.reset();
  }
}