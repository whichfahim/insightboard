import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-total-users',
  imports: [CommonModule, MatIcon],
  template: `
    <h1 class="text-main">
      {{ totalUsers?.current | number : '1.0' : 'en-US' }}
    </h1>
    <span class="text-sub"
      ><mat-icon
        [ngClass]="percentageChange > 0 ? 'text-color-green' : 'text-color-red'"
      >
        {{ percentageChange > 0 ? 'arrow_circle_up' : 'arrow_circle_down' }}
      </mat-icon>
      <p
        *ngIf="!loading"
        [ngClass]="percentageChange > 0 ? 'text-color-green' : 'text-color-red'"
      >
        {{ percentageChange | number : '1.0' }}%
      </p>
      <p *ngIf="loading">Loading...</p>
    </span>
  `,
  styles: `
    .text-main{
      font-size: 3rem;
      margin: 5px 0 5px 0;
    }

    .text-color-green{
      color: green;
    }
    
    
    .text-color-red{
      color: red;
    }

    .text-sub{
      display: flex;
      align-items: center;
      gap: 5px
    }
  `,
})
export class TotalUsersComponent implements OnInit {
  totalUsers: { current: number; prev: number } | null = null;
  percentageChange: number = 0;
  loading = true;

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTotalUsers().subscribe({
      next: (res) => {
        this.totalUsers = res;

        const current = res?.current ?? 0;
        const prev = res?.prev ?? 1;

        this.percentageChange = ((current - prev) / prev) * 100;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load totalUsers:', err);
      },
    });
  }
}
