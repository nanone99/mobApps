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
  styleUrls: ['./movie-details.page.scss'],
  imports: [IonIcon, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, NgFor, NgIf, IonButton],
})

export class MovieDetailsPage {

  movieId!: number;
  cast: any[] = [];
  crew: any[] = [];
  movieDetails: any = null;

  creditsBaseUrl: string = "https://api.themoviedb.org/3/movie/";

    constructor(private route: ActivatedRoute, private mhs: MyHttp, private router: Router,private favs: FavouritesService) {
    
      //Source: https://stackoverflow.com/questions/77726607/ionicons-are-not-displayed-in-ionic-7-1-1-angular-17-0-8
    addIcons({
      heart,
      heartOutline,
      heartSharp,
      home
    });

    }

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCredits();
    this.getMovieDetails();
  }

  async getCredits() {
    const url = this.creditsBaseUrl + this.movieId + "/credits?api_key=5e54dc8ed94df0555b86c1f840441c4e";
    const options: HttpOptions = { url };
    const result = await this.mhs.get(options);
    this.cast = result.data.cast;
    this.crew = result.data.crew;
  }

  async getMovieDetails() {
    const url = `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=5e54dc8ed94df0555b86c1f840441c4e`;
    const result = await this.mhs.get({ url });
    this.movieDetails = result.data;
  }  

  openPerson(id: number) {
    this.router.navigate(['/details', id]);
  }

  async addToFavourites() {
    await this.favs.add(this.movieDetails);
  }

  //Source: https://stackoverflow.com/questions/40245847/how-to-go-to-another-page-with-a-button-click-with-ionic
  goToFavourites() {
    this.router.navigate(['/favourites']);
  }  

    //Source: https://stackoverflow.com/questions/40245847/how-to-go-to-another-page-with-a-button-click-with-ionic
    goHome() {
      this.router.navigate(['/home']);
    }  
      
  
}

 

