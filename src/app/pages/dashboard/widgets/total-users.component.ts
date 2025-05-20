import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-total-users',
  imports: [MatIcon],
  template: `
    <h1 class="text-main">12,530</h1>
    <span class="text-sub"
      ><mat-icon class="text-color-green"> arrow_circle_up </mat-icon>
      <p class="percentage-change text-color-green">4.2%</p>
    </span>
  `,
  styles: `
    .text-main{
      margin: 5px 0 5px 0;
    }

    .text-color-green{
      color: green;
    }
    

    .text-sub{
      display: flex;
      align-items: center;
      gap: 5px
    }
  `,
})
export class TotalUsersComponent {}
