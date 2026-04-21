import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonSpinner, IonThumbnail } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FixturesService } from '../services/fixtures';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonSpinner, IonThumbnail, CommonModule],
})
export class Tab2Page implements OnInit {

  fixtures: any[] = [];
  isLoading = true;

  constructor(private fixturesService: FixturesService) {}

  ngOnInit() {
    this.fixturesService.getFixtures().subscribe((data: any) => {
      this.fixtures = data.articles;
      this.isLoading = false;
    });
  }

}