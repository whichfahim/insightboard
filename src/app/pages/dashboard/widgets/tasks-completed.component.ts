import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-tasks-completed',
  imports: [],
  template: `
    <div class="container">
      <h1 class="text-main">{{ tasksCompleted.current }}</h1>
    </div>
  `,
  styles: `
    .container{
        height: 75px;
        width: 100px;
        background-color: orange;
        margin: 25% auto;

        border-radius: 10px;

        display: flex;
        align-items: center;
        justify-content: center;
    }
  `,
})
export class TasksCompletedComponent {
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
