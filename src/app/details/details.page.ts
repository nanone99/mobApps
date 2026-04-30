import { Component } from '@angular/core'; //Default import from angular
import { ActivatedRoute } from '@angular/router'; //Default import from angular 
import { FormsModule } from '@angular/forms'; //Import for ngModel
import { CommonModule } from '@angular/common'; // Import for ngif,ngfor
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButtons, IonButton, IonIcon, IonBackButton } from '@ionic/angular/standalone'; // Import for ionic http native elements
import { MyHttp } from '../services/my-http'; // Import for the API calls service
import { addIcons } from 'ionicons'; // Import for icons
import { heart, home } from 'ionicons/icons'; //Import for home
import { NavigationService } from '../services/navigation.service'; // Import for the navigation servie
import { OnInit } from '@angular/core'; // Import for onInit


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  standalone: true,
  imports: [IonBackButton, IonIcon, IonButton, IonButtons,IonContent, IonHeader, IonTitle, IonToolbar,IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,CommonModule, FormsModule, CommonModule,FormsModule]
})
export class DetailsPage implements OnInit {

  personId!: number; //This variable will store the personID
  person: any = null; //This will store the details from the JSON
  movies: any[] = []; // This will store the case data

  //Constructor includes the activated route (to pass the URL id), Myhttp call, routing to the other pages
  constructor( private route: ActivatedRoute, private mhs: MyHttp, private nav: NavigationService) {
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
  //Method to navigate favourites when the home icon is pressed from the naviagation service
  goToFavourites() {
    this.nav.goToFavourites();
  }  

  //Source: https://stackoverflow.com/questions/40245847/how-to-go-to-another-page-with-a-button-click-with-ionic
  //Method to navigate home when the home icon is pressed from the naviagation service
  goHome() {
    this.nav.goHome();
  }

    //Source: https://stackoverflow.com/questions/40245847/how-to-go-to-another-page-with-a-button-click-with-ionic
  //Method to navigate to movie details when clicked from the navigation service
  openMovie(id: number) {
    this.nav.openMovie(id);
  }
}


  


