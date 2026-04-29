import { Component } from '@angular/core';
import { FavouritesService } from '../services/favourites.service';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle, IonBackButton } from "@ionic/angular/standalone";
import { NgFor } from '@angular/common';
import { addIcons } from 'ionicons';
import { home } from 'ionicons/icons';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  imports: [IonBackButton, IonTitle, IonIcon, IonButtons, IonToolbar, IonHeader, IonContent,IonButton,NgFor]
})

export class FavouritesPage {

  favouriteMovies: any[] = []; //This array will be used to store the favourites movies saved

  //The constructor will bring the favouritesService for storage, router for navigation and then addIcons will load the home icon on top
  constructor(private favs: FavouritesService, private nav: NavigationService) {
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
  //This will help us route the id to the movie details page to ensure it is passed over the URL.
  openDetails(id: number) {
    this.nav.openDetails(id);
  }

  //Source: https://stackoverflow.com/questions/40245847/how-to-go-to-another-page-with-a-button-click-with-ionic
  //Method to navigate home when the home icon is pressed
  goHome() {
    this.nav.goHome();
  }
}

