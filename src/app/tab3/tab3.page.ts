import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonThumbnail, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage';
import { ViewWillEnter } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonThumbnail, IonButton, IonIcon, CommonModule],
})
export class Tab3Page implements OnInit, ViewWillEnter {

  savedArticles: any[] = [];

  constructor(private storageService: StorageService) {
    addIcons({ trashOutline });
  }

  ngOnInit() {
    this.loadSaved();
  }

  ionViewWillEnter() {
    this.loadSaved();
  }

  async loadSaved() {
    this.savedArticles = await this.storageService.get('savedArticles') || [];
  }

  async removeArticle(article: any) {
    this.savedArticles = this.savedArticles.filter((a: any) => a.link !== article.link);
    await this.storageService.set('savedArticles', this.savedArticles);
  }

}