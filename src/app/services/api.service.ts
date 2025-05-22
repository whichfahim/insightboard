import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

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

  async getRecentActivity() {
    try {
      return await lastValueFrom(
        this.http.get(`${this.apiUrl}/recentActivity`)
      );
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getSalesData() {
    try {
      return await lastValueFrom(this.http.get(`${this.apiUrl}/salesData`));
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
