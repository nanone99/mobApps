import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonSearchbar, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, heartOutline, heartSharp } from 'ionicons/icons';
import { NavigationService } from '../services/navigation.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [IonIcon, IonButtons, IonSearchbar, IonButton, IonText, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule],
})

export class HomePage {

  allTrendingMovies: any[] = []; //Creates an empty array for the master API TrendingMovies list
  displayedMovies: any[] = []; //Creates an empty array for the copy API TrendingMovies list that will be displayed
  searchText: string = ""; // Creates an empty variable that will be used in the search bar
  currentTitle: string = ""; // This will create a varaible to display between Today's trending movies and title + Movies
  selectedMovie: any = null; // This is to ensure the movie is displayed in the bottom part of the home screen when selected



  //Source: CApacitator http lecture
  // This is the API call for the Trending movies
  trendingOptions: HttpOptions = {
    url: "https://api.themoviedb.org/3/trending/movie/day?api_key=5e54dc8ed94df0555b86c1f840441c4e"
  };

  //Source: Capacitator http lecture
  // This is the API call for the full list of movies that will be searcheable taht will be concatenated with the searchText variable to display whatever is searched by user
  searchBaseUrl: string =
    "https://api.themoviedb.org/3/search/movie?api_key=5e54dc8ed94df0555b86c1f840441c4e&query="; // URL and then we will add the search variables seearchtext ="toystory"

  //This construction will bring as parameters the myHttp service for the API connection and the router for navigation.
  constructor(private mhs: MyHttp,private nav: NavigationService) {
    
    //Source: https://stackoverflow.com/questions/77726607/ionicons-are-not-displayed-in-ionic-7-1-1-angular-17-0-8
    addIcons({
      heart,
      heartOutline,
      heartSharp
    });
  }

  ngOnInit() {
    this.getTrendingResults(); //This will getTrendingResults when the app gets initiated before anything is searched
    this.currentTitle = "Today's Trending Movies";
  }

  //Data Retrieval Methods

  //Source: Capacitator http lecture
  //Method to bring over the API Json data for Today's trending movies in the homepag
  async getTrendingResults() {
    const result = await this.mhs.get(this.trendingOptions); //This is the get method from the API call that brings over the URL in trending options
    this.allTrendingMovies = result.data.results;   // master copy array saved in allTrendingMovies which are brought from the JSON file in the API call
    this.displayedMovies = this.allTrendingMovies.slice(); // UI copy array saved in displayedMovies which are brought from the JSON file in the API call for today's trending movies (used for having the filtered data before searching)
  }

  //Source: Capacitator http lecture
  //This will bring take variable searchText generated from HTML and make the API call ofr query=searchtext and display the movies searched.
  async getSearchResults() {
    let fullUrl = this.searchBaseUrl + this.searchText; //Constructs the string that will create full URL passed on when searching.
    let options: HttpOptions = { url: fullUrl }; //this passes the string into the http service as the url
    const result = await this.mhs.get(options); //This gets all the results from the API
    this.displayedMovies = result.data.results; //Bring on the data for all the movies based on the searched URL
  }

  //Fitlering list/title methods

  //This method controls the display of trending movies when searchText is blank or display the searched movie
  onSearch() {
    this.titleSwitch();  //This triggers the method below to change the title when a movie is searched
    //This if statement will display the searched movie from the getSearchREsults API call or the copied array for trendingmovies from getTrendingResults
    if (this.searchText.trim() === "") {
      this.displayedMovies = this.allTrendingMovies.slice();
      return;
    }
    this.getSearchResults();
  }
  
  //This will change the title from trending movies to the title of the movie when searching
  titleSwitch() {
    //This if statement will do the switch of the title just as it was done for the searched movies vs trending
    if (this.searchText.trim() === "") {
      this.currentTitle = "Today's Trending Movies";
    } else {
      this.currentTitle = this.searchText + " Movies";
    }
  }
  

  //Navigation Methods

  //This will help us route the id to the movie details page to ensure it is passed over the URL.
  openDetails(id: number) {
    this.nav.openDetails(id);
  }

  //Source: https://stackoverflow.com/questions/40245847/how-to-go-to-another-page-with-a-button-click-with-ionic
  goToFavourites() {
    this.nav.goToFavourites();
  } 
    
}