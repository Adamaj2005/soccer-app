import { Injectable } from '@angular/core';
import { NewsService } from './news';
import { FixturesService } from './fixtures';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private newsSubject = new ReplaySubject<any[]>(1);
  private fixturesSubject = new ReplaySubject<any[]>(1);

  news$ = this.newsSubject.asObservable();
  fixtures$ = this.fixturesSubject.asObservable();

  constructor(private newsService: NewsService, private fixturesService: FixturesService) {
    this.loadAll();
  }

  loadAll() {
    this.newsService.getSoccerNews().subscribe((data: any) => {
      this.newsSubject.next(data.articles);
    });
    this.fixturesService.getFixtures().subscribe((data: any) => {
      this.fixturesSubject.next(data.articles);
    });
  }

}