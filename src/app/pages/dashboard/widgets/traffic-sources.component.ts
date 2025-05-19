import { Component, ElementRef, viewChild } from '@angular/core';
import Chart from 'chart.js/auto';

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
      height: calc(100%-10px)
      width: 100% 
    }
  `,
})
export class TrafficSourcesComponent {
  chart = viewChild.required<ElementRef>('piechart');

  ngOnInit() {
    new Chart(this.chart().nativeElement, {
      type: 'pie',
      data: {
        labels: ['Direct', 'Referral', 'Others'],
        datasets: [
          {
            label: 'Traffic Sources',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
      },
    });
  }
}
