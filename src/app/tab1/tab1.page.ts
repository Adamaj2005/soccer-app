import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonThumbnail, IonSpinner } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { NewsService } from '../services/news';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonThumbnail, IonSpinner, CommonModule],
})
export class Tab1Page implements OnInit {

  newsArticles: any[] = [];
  isLoading = true;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.getSoccerNews().subscribe((data: any) => {
      this.newsArticles = data.articles;
      this.isLoading = false;
    });
  }

}