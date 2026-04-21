import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FixturesService {

  private apiKey = 'dc0010da14e74ae01ca9ba6d06ad5fd8';
  private apiUrl = 'https://gnews.io/api/v4/search?q=premier+league+fixtures&lang=en&max=10&token=';

  constructor(private http: HttpClient) {}

  getFixtures(): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.apiKey}`);
  }

}