import { Component } from '@angular/core';

@Component({
  selector: 'app-traffic-sources',
  imports: [],
  template: `
    <div class="chart-container">
      <canvas #piechart></canvas>
    </div>
  `,
  styles: `
    .chart-container{
      height: calc(100% - 10px)
      width: 100%
    }
  `,
})
export class TrafficSourcesComponent {}
