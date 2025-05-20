import { Component } from '@angular/core';

@Component({
  selector: 'app-revenue',
  imports: [],
  template: `
    <div class="container">
      <h2>65,200</h2>
    </div>
  `,
  styles: `
    .container{
      border: 1rem solid green;
      height: 100px;
      width: 100px;
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
