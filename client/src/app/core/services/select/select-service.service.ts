import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SelectServiceService {
  constructor(private http: HttpClient) {}
  url =
    'https://demo.codingbirdsonline.com/country-state-city-dropdown-api/index.php?endpoint=';

  getAllCountry(): Promise<any> {
    return lastValueFrom(this.http.get(this.url + 'getcountry'));
  }

  getState(country_id: any): Promise<any> {
    return lastValueFrom(
      this.http.get(
        `https://demo.codingbirdsonline.com/country-state-city-dropdown-api/index.php?endpoint=getstate&country_id=${country_id}`
      )
    );
  }

  getCity(state_id: any): Promise<any> {
    return lastValueFrom(
      this.http.get(
        `https://demo.codingbirdsonline.com/country-state-city-dropdown-api/index.php?endpoint=getcity&state_id=${state_id}`
      )
    );
  }

  getLocation(lat: any, lng: any): Promise<any> {
    return lastValueFrom(
      this.http.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      )
    );
  }
}
