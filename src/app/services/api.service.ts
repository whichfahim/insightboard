import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  async getTrafficData() {
    try {
      return await lastValueFrom(
        this.http.get(`${this.apiUrl}/trafficSources`)
      );
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
