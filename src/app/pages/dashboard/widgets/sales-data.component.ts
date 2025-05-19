import { Component, ElementRef, viewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-sales-data',
  imports: [],
  template: `
    <div class="chart-container">
      <canvas #chart></canvas>
    </div>
  `,
  styles: `
    .chart-container{
      height: calc(100%-10px)
      width: 100% 
    }
  `,
})
export class SalesDataComponent {
  chart = viewChild.required<ElementRef>('chart');

  ngOnInit() {
    new Chart(this.chart().nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Sales Data',
            data: [100, 120, 110, 130, 120, 140],
            borderColor: 'rgb(255, 99, 132',
            backgroundColor: 'rgb(255,99,132, 0.5',
            fill: 'start',
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4,
          },
        },
      },
    });
  }
}
