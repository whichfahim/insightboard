import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks-completed',
  imports: [],
  template: `
    <div class="container">
      <h1 class="text-main">275</h1>
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
export class TasksCompletedComponent {}
