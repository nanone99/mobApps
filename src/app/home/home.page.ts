import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonText, IonSearchbar, IonButton } from '@ionic/angular/standalone';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonSearchbar, IonButton, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule  ],
})

export class HomePage {

  allTrendingMovies: any[] = []; //Creates an empty array for the master API TrendingMovies list
  displayedMovies: any[] = []; //Creates an empty array for the copy API TrendingMovies list that will be displayed
  searchText: string = ""; // Creates an empty variable that will be used in the search bar
  currentTitle: string = "";


  //Source: CApacitator http lecture
  // This is the API call for the Trending movies
  trendingOptions: HttpOptions = {
    url: "https://api.themoviedb.org/3/trending/movie/day?api_key=5e54dc8ed94df0555b86c1f840441c4e"
  };

  //Source: CApacitator http lecture
  // This is the API call for the full list of movies that will be searcheable taht will be concatenated with the searchText variable to display whatever is searched by user
  searchBaseUrl: string =
    "https://api.themoviedb.org/3/search/movie?api_key=5e54dc8ed94df0555b86c1f840441c4e&query="; // URL and then we will add the search variables seearchtext ="toystory"

  
  constructor(private mhs: MyHttp, private router: Router) {}

  ngOnInit() {
    this.getTrendingResults(); //This will getTrendingResults when the app gets initiated before anything is searched
  }

  
  async getTrendingResults() {
    const result = await this.mhs.get(this.trendingOptions);

    this.allTrendingMovies = result.data.results;   // master copy
    this.displayedMovies = this.allTrendingMovies.slice(); // UI copy
  }

  //This will bring the exact URL that will display searched movies
  async getSearchResults() {
    let fullUrl = this.searchBaseUrl + this.searchText; //Constructs the string that will create full URL passed on when searching.
    let options: HttpOptions = { url: fullUrl }; //this passes the string into the http service as the url
    const result = await this.mhs.get(options); //This gets all the results from the API
    this.displayedMovies = result.data.results; //Bring on the data for all the movies based on the searched URL
  }

    onSearch() {
    this.titleSwitch(); 
    if (this.searchText.trim() === "") {
      this.displayedMovies = this.allTrendingMovies.slice();
      return;
    }
    this.getSearchResults();
  }
  
  titleSwitch() {
      if (this.searchText.trim() === "") {
        this.currentTitle = "Today's Trending Movies";
      } else {
        this.currentTitle = this.searchText + " Movies";
      }
    }
    
  openDetails(id: number) {
     this.router.navigate(['/movie-details', id]);
    }
    
}