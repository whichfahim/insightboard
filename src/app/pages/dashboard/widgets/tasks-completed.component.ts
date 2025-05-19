import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tasks-completed',
  imports: [MatIcon],
  template: `
    <div class="row mb-8 mt-8">
      <p class="stat">275</p>
      <mat-icon class="text-green">arrow_circle_up</mat-icon>
      <span class="text-green">3.1%</span>
    </div>
  `,
  styles: '',
})
export class TasksCompletedComponent {}
