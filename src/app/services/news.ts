import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiKey = 'pub_42ec3d6a3abd4c9ba69cbdb92705a168';
  private apiUrl = 'https://newsdata.io/api/1/news?apikey=';

  constructor(private http: HttpClient) {}

  getSoccerNews(): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.apiKey}&q=soccer&language=en&category=sports`);
  }

}