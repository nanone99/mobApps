import { Component } from '@angular/core';
import { FavouritesService } from '../services/favourites.service';
import { Router } from '@angular/router';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonButton, IonImg, IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle } from "@ionic/angular/standalone";
import { NgFor } from '@angular/common';
import { addIcons } from 'ionicons';
import { home } from 'ionicons/icons';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  imports: [IonTitle, IonIcon, IonButtons, IonToolbar, IonHeader, IonContent,IonCard,IonCardHeader,IonCardTitle,IonButton,IonImg,NgFor]
})
export class FavouritesPage {

  favouriteMovies: any[] = [];

  constructor(private favs: FavouritesService, private router: Router) {
    addIcons({
      home
    });

  }

  async ionViewWillEnter() {
    this.favouriteMovies = await this.favs.get();
  }

  async remove(id: number) {
    await this.favs.remove(id);
    this.favouriteMovies = await this.favs.get(); // refresh list
  }
  

  openDetails(id: number) {
    this.router.navigate(['/movie-details', id]);
  }

  goHome() {
    this.router.navigate(['/home']);
  } 
}

