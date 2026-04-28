import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { NgFor, NgIf } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent,IonButton, IonButtons, IonIcon } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { FavouritesService } from '../services/favourites.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline, heartSharp, home } from 'ionicons/icons';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  imports: [IonIcon, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, NgFor, NgIf, IonButton],
})

export class MovieDetailsPage {

  movieId!: number; //Creates a variable to storage the movieID which will be passed on to the get method
  cast: any[] = []; //Creates an empty array to store the cast JSON data
  crew: any[] = []; //Creates an empty array to store the crew JSON data
  movieDetails: any = null; //Creates a variable to store the movie details JSON data

  //This variable stores the first part of the URL that later will be injected with the movieID and the API key
  creditsBaseUrl: string = "https://api.themoviedb.org/3/movie/";

  //Constructor includes the activated route (to pass the URL id), Myhttp call, routing to the other pages and favourites storage inonic facility to save the faourites data 
  constructor(private route: ActivatedRoute, private mhs: MyHttp, private router: Router,private favs: FavouritesService) {
    
    //Source: https://stackoverflow.com/questions/77726607/ionicons-are-not-displayed-in-ionic-7-1-1-angular-17-0-8
    //This will load the icons for favourites at the top of the page
    addIcons({
      heart,
      home
    });

    }

  //This will load at the start the ID of the movie to ensure the correct movie data is retreived, and also the getCredits and getMovieDetails methods from below
  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCredits();
    this.getMovieDetails();
  }

  //Data Retrieval Methods

  //Source: Capacitator http lecture
  //Method to bring over the API Json data for cast and crew credits
  async getCredits() {
    const url = this.creditsBaseUrl + this.movieId + "/credits?api_key=5e54dc8ed94df0555b86c1f840441c4e";
    const options: HttpOptions = { url };
    const result = await this.mhs.get(options);
    this.cast = result.data.cast;
    this.crew = result.data.crew;
  }

  //Source: Capacitator http lecture
  //Method to bring over the API Json data for getting the movie details
  async getMovieDetails() {
    const url = `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=5e54dc8ed94df0555b86c1f840441c4e`;
    const result = await this.mhs.get({ url });
    this.movieDetails = result.data;
  }  

  //Navigation Methods

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
      
  // Storage Method

  //Source: Storage Lecture
  //This method is to add to favourites which the logic is in the service favourites
  async addToFavourites() {
    await this.favs.add(this.movieDetails);
  }

}

 

