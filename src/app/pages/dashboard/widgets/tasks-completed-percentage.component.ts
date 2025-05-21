import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tasks-completed-percentage',
  imports: [CommonModule, MatIcon],
  template: `<h1 class="text-main">
      {{ tasksCompleted.current | number : '1.0' : 'en-US' }}
    </h1>
    <span class="text-sub"
      ><mat-icon
        [ngClass]="percentageChange > 0 ? 'text-color-green' : 'text-color-red'"
      >
        {{ percentageChange > 0 ? 'arrow_circle_up' : 'arrow_circle_down' }}
      </mat-icon>
      <p
        [ngClass]="percentageChange > 0 ? 'text-color-green' : 'text-color-red'"
      >
        {{ percentageChange | number : '1.0' }}%
      </p>
    </span>`,
  styles: `
    .text-main{
      font-size: 3rem;
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
export class TasksCompletedPercentageComponent {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000';
  tasksCompleted: { current: number; prev: number };
  percentageChange: number;

  constructor() {
    this.http.get(`${this.apiUrl}/tasksCompleted`).subscribe((res: any) => {
      this.tasksCompleted = res;
      this.percentageChange =
        ((this.tasksCompleted.current - this.tasksCompleted.prev) /
          this.tasksCompleted.prev) *
        100;
    });
  }
}
