import { Component } from '@angular/core';
import { FavouritesService } from '../services/favourites.service';
import { Router } from '@angular/router';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonButton, IonImg, IonHeader, IonToolbar } from "@ionic/angular/standalone";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  imports: [IonToolbar, IonHeader, IonContent,IonCard,IonCardHeader,IonCardTitle,IonButton,IonImg,NgFor]
})
export class FavouritesPage {

  favouriteMovies: any[] = [];

  constructor(private favs: FavouritesService, private router: Router) {}

  async ionViewWillEnter() {
    this.favouriteMovies = await this.favs.get();
  }

  openDetails(id: number) {
    this.router.navigate(['/movie-details', id]);
  }
}

