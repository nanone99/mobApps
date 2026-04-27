import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class MyHttp {
  
//Source: Capacitator Lecture
//This will use the capacitator plugin to retrieve the data from an object which in this case is the JSON data from the movie API
async get(options: HttpOptions) {
    return await CapacitorHttp.get(options);
  }
}
