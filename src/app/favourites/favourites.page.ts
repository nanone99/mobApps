import { Component } from '@angular/core'; //Default import from angular
import { FavouritesService } from '../services/favourites.service';//Import for storage favourites services
import { IonContent, IonButton, IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle, IonBackButton } from "@ionic/angular/standalone"; // Import for ionic http native elements
import { CommonModule } from '@angular/common'; // Import for ngif,ngfor
import { addIcons } from 'ionicons'; // Import for icons
import { home } from 'ionicons/icons'; //Import the home icon
import { NavigationService } from '../services/navigation.service'; // Import for navigation services

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  imports: [IonBackButton, IonTitle, IonIcon, IonButtons, IonToolbar, IonHeader, IonContent,IonButton,CommonModule]
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
  ///Method to navigate favourites when the cast and crew image is pressed from the naviagation service
  openDetails(id: number) {
    this.nav.openDetails(id);
  }

  //Source: https://stackoverflow.com/questions/40245847/how-to-go-to-another-page-with-a-button-click-with-ionic
  //Method to navigate home when the home icon is pressed from the navigation services
  goHome() {
    this.nav.goHome();
  }
}

