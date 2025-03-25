import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChampionImgService } from '../../../services/champion-img.service';

@Component({
  selector: 'app-results',
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  @Input() results: any[] = [];  // 🔹 Recibimos los resultados desde BottomFormComponent

  constructor(private _championService: ChampionImgService) {}

  // 🔹 Método para obtener la imagen del campeón
  getChampionImage(championName: string): string {
    return this._championService.getChampionImage(championName);
  }

  clearResults() {
    this.results = [];  
  }
}
