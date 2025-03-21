import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RiotService {

  private baseUrl = environment.apiUrl; 
  private apiRiot = `${this.baseUrl}/champions/fetch-data`;

  constructor(private http: HttpClient) { }

  fetchPlayerData(summonerName: string, tag: string, line: number): Observable<{ message: string }> {
    const params = new HttpParams()
      .set('summonerName', summonerName)
      .set('tag', tag)
      .set('line', line.toString());
  
    return this.http.get<{ message: string }>(this.apiRiot, { params });
  }
}
