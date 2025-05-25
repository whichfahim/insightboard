import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-revenue',
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>{{ revenue | number : '1.0' : 'en-US' }}</h1>
    </div>
  `,
  styles: `
    .container{
      border: 1rem solid #58C481;
      height: 150px;
      width: 150px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;

      text-align: center;

      border-radius: 100%
    }
  `,
})
export class RevenueComponent {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000';
  revenue: number;

  constructor() {
    this.http.get(`${this.apiUrl}/revenue`).subscribe((res: any) => {
      this.revenue = res;
    });
  }
}
