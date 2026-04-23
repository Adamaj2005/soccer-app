import { Injectable } from '@angular/core';
import { NewsService } from './news';
import { FixturesService } from './fixtures';
import { catchError, shareReplay, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  news$: Observable<any>;
  fixtures$: Observable<any>;

  constructor(private newsService: NewsService, private fixturesService: FixturesService) {
    this.news$ = this.newsService.getSoccerNews().pipe(
      catchError(() => of({ results: [] })),
      map((data: any) => {
        const seen = new Set();
        return (data.results || []).filter((article: any) => {
          if (seen.has(article.title)) return false;
          seen.add(article.title);
          return true;
        });
      }),
      shareReplay(1)
    );
    this.fixtures$ = this.fixturesService.getFixtures().pipe(
      catchError(() => of({ results: [] })),
      map((data: any) => {
        const seen = new Set();
        return (data.results || []).filter((article: any) => {
          if (seen.has(article.title)) return false;
          seen.add(article.title);
          return true;
        });
      }),
      shareReplay(1)
    );
  }

}