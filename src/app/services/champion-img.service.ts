import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChampionImgService {

  private ddragonVersion$ = new BehaviorSubject<string>('14.13.1'); // Versión de respaldo

  constructor(private http: HttpClient) { 
    this.fetchLatestVersion();
  }

  private async fetchLatestVersion(): Promise<void> {
    try {
      const response: string[] = await firstValueFrom(
        this.http.get<string[]>('https://ddragon.leagueoflegends.com/api/versions.json')
          .pipe(catchError(() => [])) // Evita que la app falle si hay error
      );

      if (response.length > 0) {
        this.ddragonVersion$.next(response[0]); // La versión más reciente
      }
    } catch (error) {
      console.error('❌ Error al obtener la versión más reciente de DDragon:', error);
    }
  }

  getChampionImage(championName: string): string {
    const version = this.ddragonVersion$.getValue();
    const normalizedChampionName = this.normalizeChampionName(championName);
    return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${normalizedChampionName}.png`;
  }

  private normalizeChampionName(championName: string): string {
    return championName.replace(/\s+/g, '').trim(); // Quita espacios y formatea
  }
}
