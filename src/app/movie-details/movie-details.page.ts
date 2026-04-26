import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { NgFor, NgIf } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent,IonButton } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { FavouritesService } from '../services/favourites.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, NgFor, NgIf, IonButton],
})

export class MovieDetailsPage {

  movieId!: number;
  cast: any[] = [];
  crew: any[] = [];
  movieDetails: any = null;

  creditsBaseUrl: string = "https://api.themoviedb.org/3/movie/";

    constructor(private route: ActivatedRoute, private mhs: MyHttp, private router: Router,private favs: FavouritesService) {}

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
  
}

 

