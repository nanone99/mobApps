import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonItem, IonList, IonLabel, IonThumbnail, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { addIcons } from 'ionicons';
import { heart, heartOutline, heartSharp, home } from 'ionicons/icons';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonButtons, IonLabel, IonList, IonItem,IonContent, IonHeader, IonTitle, IonToolbar,IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,IonImg,CommonModule, FormsModule, NgIf, NgFor, IonThumbnail]
})
export class DetailsPage implements OnInit {

  personId!: number; //This variable will store the personID
  person: any = null; //This will store the details from the JSON
  movies: any[] = []; // This will store the case data

  //Constructor includes the activated route (to pass the URL id), Myhttp call, routing to the other pages
  constructor( private route: ActivatedRoute, private mhs: MyHttp, public router: Router) {
    //Source: https://stackoverflow.com/questions/77726607/ionicons-are-not-displayed-in-ionic-7-1-1-angular-17-0-8
    //This will load the icons for favourites at the top of the page
    addIcons({
      heart,
      home
    });
  }

  //This will load the ID that will be used to locate build the URL for the API and trigger on start the getPersonDetails, getPersonMovies API call methods
  ngOnInit() {
    this.personId = Number(this.route.snapshot.paramMap.get('id'));
    this.getPersonDetails();
    this.getPersonMovies();
  }

  //Data Retrieval Methods
  
  //Source: Capacitator http lecture
  //Method to bring over the API Json data for cast and crew credits
  async getPersonDetails() {
    const url = `https://api.themoviedb.org/3/person/${this.personId}?api_key=5e54dc8ed94df0555b86c1f840441c4e`;
    const result = await this.mhs.get({ url });
    this.person = result.data;
  }

  //Source: Capacitator http lecture
  //Method to bring over the API Json data for personID
  async getPersonMovies() {
    const url = `https://api.themoviedb.org/3/person/${this.personId}/movie_credits?api_key=5e54dc8ed94df0555b86c1f840441c4e`;
    const result = await this.mhs.get({ url });
    this.movies = result.data.cast;
  }


  //Navigation Methods

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

  //Source: https://stackoverflow.com/questions/40245847/how-to-go-to-another-page-with-a-button-click-with-ionic
  //Method to navigate to movie details when clicked
  openMovie(id: number) {
    this.router.navigate(['/movie-details', id]);
  }
  
}

