import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  private key = 'favouriteMovies';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async get() {
    return (await this.storage.get(this.key)) || [];
  }

  async set(value: any[]) {
    await this.storage.set(this.key, value);
  }

  async add(movie: any) {
    const favs = await this.get();
    favs.push(movie);
    await this.set(favs);
  }

  async remove(id: number) {
    const favs = await this.get();
    const updated = favs.filter((m: any) => m.id !== id);
    await this.set(updated);
  }
  
}
