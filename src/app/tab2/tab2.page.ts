import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonSpinner, IonThumbnail } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonSpinner, IonThumbnail, CommonModule],
})
export class Tab2Page implements OnInit {

  fixtures: any[] = [];
  isLoading = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.fixtures$.subscribe((articles) => {
      this.fixtures = articles;
      this.isLoading = false;
    });
  }

}