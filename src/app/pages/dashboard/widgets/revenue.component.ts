import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-revenue',
  imports: [],
  template: `
    <div class="container">
      <h1>{{ revenue.value }}</h1>
    </div>
  `,
  styles: `
    .container{
      border: 1rem solid green;
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
  revenue: { value: number };

  constructor() {
    this.http.get(`${this.apiUrl}/revenue`).subscribe((res: any) => {
      console.log('res', res);
      this.revenue = res;
    });
  }
}
