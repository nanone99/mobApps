import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root',
})
export class NavigationService {

  constructor(private router: Router) {}

    //this method is to open the person data when the image of clicked on the html
    openPerson(id: number) {
      this.router.navigate(['/details', id]);
    }
  
    //Source: https://stackoverflow.com/questions/40245847/how-to-go-to-another-page-with-a-button-click-with-ionic
    //Method to navigate to favourites
    goToFavourites() {
      this.router.navigate(['/favourites']);
    }  
  
    //Source: https://stackoverflow.com/questions/40245847/how-to-go-to-another-page-with-a-button-click-with-ionic
    //Method to navigate home when the home icon is pressed
    goHome() {
      this.router.navigate(['/home']);
    } 
    
    //This will help us route the id to the movie details page to ensure it is passed over the URL.
    openDetails(id: number) {
    this.router.navigate(['/movie-details', id]);
    }

    //Source: https://stackoverflow.com/questions/40245847/how-to-go-to-another-page-with-a-button-click-with-ionic
    //Method to navigate to movie details when clicked
    openMovie(id: number) {
      this.router.navigate(['/movie-details', id]);
    }


}
