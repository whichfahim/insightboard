import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-recent-activity',
  imports: [],
  template: `
    @if (tasks.length){
    <ul>
      @for (task of tasks; track task){
      <li>
        <span class="activity-span">
          <p class="task">{{ task?.task }}</p>
          <p class="timestamp">{{ task?.timestamp }}</p>
        </span>
      </li>
      }
    </ul>

    } @else {
    <p>No recent activity available.</p>
    }
  `,
  styles: `
  

    .activity-span{
      margin-bottom: 5px;
    }
    .task{
      margin-bottom: 5px;
      font-weight: bold;
    }

    .timestamp{
      margin:0;
      color: grey;
    }
  `,
})
export class RecentActivityComponent {
  tasks: any[] = [];
  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getRecentActivity().subscribe({
      next: (res: any) => {
        this.tasks = res || [];
      },
      error: (err) => {
        console.error('Failed to fetch recent activity:', err);
      },
    });
  }
}
