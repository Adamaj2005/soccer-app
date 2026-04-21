import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonSpinner, IonThumbnail } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FixturesService } from '../services/fixtures';
import { StorageService } from '../services/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonSpinner, IonThumbnail, CommonModule],
})
export class Tab2Page implements OnInit {

  fixtures: any[] = [];
  isLoading = true;

  constructor(private fixturesService: FixturesService, private storageService: StorageService) {}

  async ngOnInit() {
    await this.loadFixtures();
  }

  async ionViewWillEnter() {
    if (this.fixtures.length === 0) {
      await this.loadFixtures();
    }
  }

  async loadFixtures() {
    this.isLoading = true;
    const cached = await this.storageService.get('cachedFixtures');
    if (cached) {
      this.fixtures = cached;
      this.isLoading = false;
    } else {
      this.fixturesService.getFixtures().subscribe(async (data: any) => {
        this.fixtures = data.articles;
        await this.storageService.set('cachedFixtures', data.articles);
        this.isLoading = false;
      });
    }
  }

}