import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-tasks-completed',
  imports: [],
  template: `
    <div class="container">
      <h1 class="text-main">{{ tasksCompleted?.current }}</h1>
      @if (loading){
      <p>Loading tasks data...</p>
      }
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
export class TasksCompletedComponent implements OnInit {
  tasksCompleted: { current: number; prev: number } | null = null;
  percentageChange: number = 0;
  loading = true;

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTasksCompleted().subscribe({
      next: (res) => {
        if (
          res &&
          typeof res.current === 'number' &&
          typeof res.prev === 'number'
        ) {
          this.tasksCompleted = res;

          const current = res.current;
          const prev = res.prev || 1; // prevent division by zero

          this.percentageChange = ((current - prev) / prev) * 100;
        } else {
          console.error('Unexpected response:', res);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load tasksCompleted:', err);
        this.loading = false;
      },
    });
  }
}
