import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-activity',
  imports: [],
  template: `
    <!-- <h2>Recent Activity</h2> -->
    <ul>
      <li>
        <span class="activity-span"
          ><p class="task">Created a new report</p>
          <p class="timestamp">10:40 AM</p></span
        >
      </li>
      <li>
        <span class="activity-span"
          ><p class="task">Completed task</p>
          <p class="timestamp">9:20 AM</p></span
        >
      </li>
      <li>
        <span class="activity-span"
          ><p class="task">Updated profile</p>
          <p class="timestamp">2:15 PM</p></span
        >
      </li>
      <li>
        <span class="activity-span"
          ><p class="task">Added new user</p>
          <p class="timestamp">11:00 AM</p></span
        >
      </li>
    </ul>
  `,
  styles: `

    .activity-span{
      display: block;
      margin-bottom: 5px !important;
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
export class RecentActivityComponent {}
