import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-tasks-completed-percentage',
  imports: [CommonModule, MatIcon],
  template: `<h1 class="text-main">
      {{ tasksCompleted?.current | number : '1.0' : 'en-US' }}
    </h1>

    @if (percentageChange !== null) {
    <span class="text-sub">
      <mat-icon
        [ngClass]="percentageChange > 0 ? 'text-color-green' : 'text-color-red'"
      >
        {{ percentageChange > 0 ? 'arrow_circle_up' : 'arrow_circle_down' }}
      </mat-icon>
      <p
        [ngClass]="percentageChange > 0 ? 'text-color-green' : 'text-color-red'"
      >
        {{ percentageChange | number : '1.0' }}%
      </p>
    </span>
    } `,
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
export class TasksCompletedPercentageComponent implements OnInit {
  tasksCompleted: { current: number; prev: number } | null = null;
  percentageChange: number | null = null;

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTasksCompleted().subscribe({
      next: (res: { current: number; prev: number }) => {
        this.tasksCompleted = res;
        if (res.prev !== 0) {
          this.percentageChange = ((res.current - res.prev) / res.prev) * 100;
        } else {
          this.percentageChange = 0;
        }
      },
      error: (err) => {
        console.error('Failed to fetch tasksCompleted:', err);
      },
    });
  }
}
