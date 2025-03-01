import { Component } from '@angular/core';
import { ResultsComponent } from "../../components/bottom-form/results/results.component";
import { SearchComponent } from "../../components/bottom-form/search/search.component";

@Component({
  selector: 'app-mid-page',
  imports: [ResultsComponent, SearchComponent],
  templateUrl: './mid-page.component.html',
  styleUrl: './mid-page.component.css'
})
export class MidPageComponent {
  role: 'mid' = 'mid';
  results: any[] = [];
  championImage: string | null = null;

  onSearchResults(results: any[], championImage: string | null) {
    this.results = results;
    this.championImage = championImage;
  }

  clearSearchAndResults() {
    this.results = [];
    this.championImage = null;
  }
}
