import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class MyHttp {
  
async get(options: HttpOptions) {
    return await CapacitorHttp.get(options);
  }
}
