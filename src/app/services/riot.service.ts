import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiotService {

  private baseUrl = 'http://localhost:3000'; // URL base del backend
  private apiRiot = `${this.baseUrl}/champions/fetch-data`;

  constructor(private http: HttpClient) { }

  fetchPlayerData(summonerName: string, tag: string): Observable<{ message: string }> {
    const params = new HttpParams()
      .set('summonerName', summonerName)
      .set('tag', tag);

    return this.http.get<{ message: string }>(this.apiRiot, { params });
  }
}
