import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonThumbnail, IonSpinner, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { NewsService } from '../services/news';
import { Storage } from '@ionic/storage-angular';
import { addIcons } from 'ionicons';
import { bookmarkOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonThumbnail, IonSpinner, IonButton, IonIcon, CommonModule],
})
export class Tab1Page implements OnInit {

  newsArticles: any[] = [];
  isLoading = true;

  constructor(private newsService: NewsService, private storage: Storage) {
    addIcons({ bookmarkOutline });
  }

  async ngOnInit() {
    await this.storage.create();
    this.newsService.getSoccerNews().subscribe((data: any) => {
      this.newsArticles = data.articles;
      this.isLoading = false;
    });
  }

  async saveArticle(article: any) {
    const saved = await this.storage.get('savedArticles') || [];
    const exists = saved.find((a: any) => a.url === article.url);
    if (!exists) {
      saved.push(article);
      await this.storage.set('savedArticles', saved);
      alert('Article saved!');
    } else {
      alert('Already saved!');
    }
  }

}