import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

//Source: Storage lecture
export class FavouritesService {

  private key = 'favouriteMovies';

  //This will load the storage when service is created
  constructor(private storage: Storage) {
    this.init();
  }

  //This will initiate the storage database before using get, set,etc
  async init() {
    await this.storage.create();
  }

  //Sets the list of favourites from storage if blank it will create a blank array []
  async get() {
    return (await this.storage.get(this.key)) || [];
  }

  //This will save the array into storage
  async set(value: any[]) {
    await this.storage.set(this.key, value);
  }

  //This will load the saved array, push a new movie and save the updated list if it exists already it wont be added
  async add(movie: any) {
    const favs = await this.get();
    const exists = favs.some((m: any) => m.id === movie.id);
  if (exists) {
    return; 
  }
    favs.push(movie);
    await this.set(favs);
  }

  //This will load the saved array and then filter the movie with the ID of the removal and then refresh the list array
  async remove(id: number) {
    const favs = await this.get();
    const updated = favs.filter((m: any) => m.id !== id);
    await this.set(updated);
  }
  
}
