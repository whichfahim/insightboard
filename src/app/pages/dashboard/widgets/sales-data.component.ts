import { Component, ElementRef, viewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiService } from '../../../services/api.service';

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
  salesData: any;
  labels: string[];
  datapoints: number[];
  heading: string;

  constructor(private apiService: ApiService) {
    this.loadData();
  }

  async loadData() {
    this.salesData = await this.apiService.getSalesData();
    this.labels = this.salesData?.data?.labels;
    this.datapoints = this.salesData?.data?.datasets?.data;
    this.heading = this.salesData?.data.datasets.label;
    this.drawChart();
  }
  chart = viewChild.required<ElementRef>('chart');

  drawChart() {
    if (this.salesData) {
      new Chart(this.chart().nativeElement, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.heading,
              data: this.datapoints,
              borderColor: 'rgb(51, 44, 244)',
              backgroundColor: 'rgba(51, 44, 244, 0.25)',
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
  // ngOnInit() {
  //   new Chart(this.chart().nativeElement, {
  //     type: 'line',
  //     data: {
  //       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //       datasets: [
  //         {
  //           label: 'Sales Data',
  //           data: [100, 120, 110, 130, 120, 140],
  //           borderColor: 'rgb(51, 44, 244)',
  //           backgroundColor: 'rgba(51, 44, 244, 0.25)',
  //           fill: 'start',
  //         },
  //       ],
  //     },
  //     options: {
  //       maintainAspectRatio: false,
  //       elements: {
  //         line: {
  //           tension: 0.4,
  //         },
  //       },
  //     },
  //   });
  // }
}
