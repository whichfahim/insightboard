import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { async } from 'rxjs';
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
  labels: string[];
  data: number[];

  chart = viewChild.required<ElementRef>('piechart');

  constructor(private readonly apiService: ApiService) {
    this.loadData();
  }

  async loadData() {
    this.trafficSources = await this.apiService.getTrafficData();
    this.labels = Object.keys(this.trafficSources).map(
      (key) => key.charAt(0).toUpperCase() + key.slice(1)
    );
    this.data = Object.values(this.trafficSources);
    console.log('labels', this.labels, 'data', this.data);
    this.drawChart();
  }

  drawChart() {
    if (this.labels && this.data) {
      new Chart(this.chart().nativeElement, {
        type: 'pie',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: 'Traffic Sources',
              data: this.data,
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

  // ngOnInit() {}
}
