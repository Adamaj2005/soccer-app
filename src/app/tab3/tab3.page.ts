import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonThumbnail, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonThumbnail, IonButton, IonIcon, CommonModule],
})
export class Tab3Page {

  savedArticles: any[] = [];

  constructor(private storageService: StorageService) {
    addIcons({ trashOutline });
  }

  async ionViewWillEnter() {
    this.savedArticles = await this.storageService.get('savedArticles') || [];
  }

  async removeArticle(article: any) {
    this.savedArticles = this.savedArticles.filter((a: any) => a.url !== article.url);
    await this.storageService.set('savedArticles', this.savedArticles);
  }

}