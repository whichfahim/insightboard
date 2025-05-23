import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import e from 'express';
import { catchError, lastValueFrom, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  getTotalUsers(): Observable<{ current: number; prev: number }> {
    return this.http
      .get<{ current: number; prev: number }>(`${this.apiUrl}/totalUsers`)
      .pipe(
        catchError((error) => {
          console.error('API error:', error);
          return throwError(() => error);
        })
      );
  }

  getTasksCompleted(): Observable<{ current: number; prev: number }> {
    return this.http
      .get<{ current: number; prev: number }>(`${this.apiUrl}/tasksCompleted`)
      .pipe(
        catchError((error) => {
          console.error('API error:', error);
          return throwError(() => error);
        })
      );
  }

  getTrafficData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trafficSources`).pipe(
      catchError((error) => {
        console.error('Error fetching traffic data:', error);
        return throwError(() => error);
      })
    );
  }

  getRecentActivity(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recentActivity`).pipe(
      catchError((error) => {
        console.error('Error fetching recent activity:', error);
        return throwError(() => error);
      })
    );
  }

  getSalesData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/salesData`).pipe(
      catchError((error) => {
        console.error('Error fetching sales data:', error);
        return throwError(() => error);
      })
    );
  }

  getDataTable(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dataTable`).pipe(
      catchError((error) => {
        console.error('API error:', error);
        return throwError(() => error);
      })
    );
  }
}
