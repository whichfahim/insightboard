import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import Chart from 'chart.js/auto';

import { ApiService } from '../../../services/api.service';

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
export class TrafficSourcesComponent {
  trafficSources: any;
  labels: string[] = [];
  data: number[] = [];

  @ViewChild('piechart', { static: true }) piechartRef!: ElementRef;

  constructor(private readonly apiService: ApiService) {}

  drawChart(): void {
    if (!this.labels.length || !this.data.length) return;

    new Chart(this.piechartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Traffic Sources',
            data: this.data,
            backgroundColor: [
              'rgb(73, 93, 236)',
              'rgb(126, 139, 255)',
              'rgb(255, 175, 200)',
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

  ngOnInit(): void {
    this.apiService.getTrafficData().subscribe({
      next: (res: any) => {
        this.trafficSources = res;

        this.labels = Object.keys(this.trafficSources).map(
          (key) => key.charAt(0).toUpperCase() + key.slice(1)
        );

        this.data = Object.values(this.trafficSources);

        this.drawChart();
      },
      error: (err) => {
        console.error('Error loading traffic data:', err);
      },
    });
  }
}
