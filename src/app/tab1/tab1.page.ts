import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonThumbnail, IonSpinner, IonButton, IonIcon, IonSearchbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data';
import { StorageService } from '../services/storage';
import { addIcons } from 'ionicons';
import { bookmarksOutline, shareOutline } from 'ionicons/icons';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonThumbnail, IonSpinner, IonButton, IonIcon, IonSearchbar, CommonModule, FormsModule],
})
export class Tab1Page implements OnInit {

  newsArticles: any[] = [];
  filteredArticles: any[] = [];
  searchTerm: string = '';
  isLoading = true;

  constructor(private dataService: DataService, private storageService: StorageService) {
    addIcons({ bookmarksOutline, shareOutline });
  }

 ngOnInit() {
  this.dataService.news$.subscribe({
    next: (articles: any[]) => {
      this.newsArticles = articles;
      this.filteredArticles = articles;
      this.isLoading = false;
    },
    error: () => {
      this.isLoading = false;
    }
  });
}

  filterArticles() {
    const term = this.searchTerm.toLowerCase();
    this.filteredArticles = this.newsArticles.filter(article =>
      article.title?.toLowerCase().includes(term) ?? false
    );
  }

  async saveArticle(article: any) {
    try {
      const saved = await this.storageService.get('savedArticles') || [];
      const exists = saved.find((a: any) => a.link === article.link);
      if (!exists) {
        saved.push(article);
        await this.storageService.set('savedArticles', saved);
        alert('Article saved!');
      } else {
        alert('Already saved!');
      }
    } catch {
      alert('Could not save article. Please try again.');
    }
  }

  async shareArticle(article: any) {
    try {
      await Share.share({
        title: article.title,
        text: article.description,
        url: article.link,
        dialogTitle: 'Share article',
      });
    } catch {
      // Web Share API unavailable (desktop browser) — open the article instead
      if (article.link) window.open(article.link, '_blank');
    }
  }

  openArticle(url: string) {
    window.open(url, '_blank');
  }

}