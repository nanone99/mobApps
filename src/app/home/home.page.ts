import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})
export class HomePage {
  
  latestMovies: any;
  
  options: HttpOptions = {
    url: "https://api.themoviedb.org/3/trending/movie/day?api_key=5e54dc8ed94df0555b86c1f840441c4e"
  }
  constructor(private mhs: MyHttp) {}


  ngOnInit() {
    this.latestMovies = [];
    this.getResults();
  }

  async getResults() {
    let result = await this.mhs.get(this.options);
    this.latestMovies = result.data.results;
    console.log(this.latestMovies);
  }
    
}
