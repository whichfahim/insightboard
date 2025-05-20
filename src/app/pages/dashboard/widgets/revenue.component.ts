import { Component } from '@angular/core';

@Component({
  selector: 'app-revenue',
  imports: [],
  template: `
    <div class="container">
      <h1>65,200</h1>
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
export class RevenueComponent {}
