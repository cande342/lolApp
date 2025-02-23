import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BestAdcsResponse, BestSupportsResponse } from '../models/ranking';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/ranking';

  constructor(private http: HttpClient) { }

  // Método para obtener los mejores ADCs para un Support
  getBestAdcsForSupport(support: string): Observable<BestAdcsResponse> {
    return this.http.get<BestAdcsResponse>(`${this.apiUrl}/best-adcs/${support}`);
  }

  // Método para obtener los mejores Supports para un ADC
  getBestSupportsForAdc(adc: string): Observable<BestSupportsResponse> {
    return this.http.get<BestSupportsResponse>(`${this.apiUrl}/best-supports/${adc}`);
  }
}
