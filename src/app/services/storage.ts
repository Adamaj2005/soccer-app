import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageReady = false;

  constructor(private storage: Storage) {}

  async init() {
    if (!this.storageReady) {
      await this.storage.create();
      this.storageReady = true;
    }
  }

  async get(key: string) {
    await this.init();
    return this.storage.get(key);
  }

  async set(key: string, value: any) {
    await this.init();
    return this.storage.set(key, value);
  }

}