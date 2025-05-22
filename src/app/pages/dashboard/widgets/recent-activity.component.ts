import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-recent-activity',
  imports: [],
  template: `
    <ul>
      @for (task of tasks; track task){
      <li>
        <span class="activity-span">
          <p class="task">{{ task.task }}</p>
          <p class="timestamp">{{ task.timestamp }}</p>
        </span>
      </li>
      }
    </ul>
  `,
  styles: `
  

    .activity-span{
      // display: block;
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
  recentActivity: any | null;
  constructor(private readonly apiService: ApiService) {
    this.loadData();
  }

  tasks: any[];

  async loadData() {
    this.recentActivity = await this.apiService.getRecentActivity();
    this.tasks = this.recentActivity;
  }
}
