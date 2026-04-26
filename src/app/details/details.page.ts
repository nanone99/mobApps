import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonItem, IonList, IonLabel, IonThumbnail } from '@ionic/angular/standalone';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonLabel, IonList, IonItem,IonContent, IonHeader, IonTitle, IonToolbar,IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,IonImg,CommonModule, FormsModule, NgIf, NgFor, IonThumbnail]
})
export class DetailsPage implements OnInit {

  personId!: number;
  person: any = null;
  movies: any[] = [];

  constructor( private route: ActivatedRoute, private mhs: MyHttp, public router: Router) {}

  ngOnInit() {
    this.personId = Number(this.route.snapshot.paramMap.get('id'));
    this.getPersonDetails();
    this.getPersonMovies();
  }

  async getPersonDetails() {
    const url = `https://api.themoviedb.org/3/person/${this.personId}?api_key=5e54dc8ed94df0555b86c1f840441c4e`;
    const result = await this.mhs.get({ url });
    this.person = result.data;
  }

  async getPersonMovies() {
    const url = `https://api.themoviedb.org/3/person/${this.personId}/movie_credits?api_key=5e54dc8ed94df0555b86c1f840441c4e`;
    const result = await this.mhs.get({ url });
    this.movies = result.data.cast;
  }

  openMovie(id: number) {
    this.router.navigate(['/movie-details', id]);
  }
  
}

