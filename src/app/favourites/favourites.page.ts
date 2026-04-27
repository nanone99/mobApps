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

  favouriteMovies: any[] = []; //This array will be used to store the favourites movies saved

  //The constructor will bring the favouritesService for storage, router for navigation and then addIcons will load the home icon on top
  constructor(private favs: FavouritesService, private router: Router) {
    addIcons({
      home
    });

  }

  //Storage Methods

  //This Method ensures the list gets refreshed when a favourite gets added compared to OnInit which will not refreshed as the component would be cached
  async ionViewWillEnter() {
    this.favouriteMovies = await this.favs.get();
  }

  //This method removes a favourite movie from storage and then refreshes the list of favs with get 
  async remove(id: number) {
    await this.favs.remove(id);
    this.favouriteMovies = await this.favs.get(); 
  }
  
  //Navigation Methods

  //Source: https://stackoverflow.com/questions/40245847/how-to-go-to-another-page-with-a-button-click-with-ionic
  //Method to navigate to details
  openDetails(id: number) {
    this.router.navigate(['/movie-details', id]);
  }

  //Source: https://stackoverflow.com/questions/40245847/how-to-go-to-another-page-with-a-button-click-with-ionic
  //Method to navigate home when the home icon is pressed
  goHome() {
    this.router.navigate(['/home']);
  } 
}

