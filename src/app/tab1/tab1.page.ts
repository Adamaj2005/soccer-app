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
    this.dataService.news$.subscribe((articles) => {
      this.newsArticles = articles;
      this.filteredArticles = articles;
      this.isLoading = false;
    });
  }

  filterArticles() {
    this.filteredArticles = this.newsArticles.filter(article =>
      article.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async saveArticle(article: any) {
    const saved = await this.storageService.get('savedArticles') || [];
    const exists = saved.find((a: any) => a.url === article.url);
    if (!exists) {
      saved.push(article);
      await this.storageService.set('savedArticles', saved);
      alert('Article saved!');
    } else {
      alert('Already saved!');
    }
  }

  async shareArticle(article: any) {
    await Share.share({
      title: article.title,
      text: article.description,
      url: article.url,
      dialogTitle: 'Share article',
    });
  }

  openArticle(url: string) {
    window.open(url, '_blank');
  }

}