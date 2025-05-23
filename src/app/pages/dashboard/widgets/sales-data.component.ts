import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiService } from '../../../services/api.service';
import { firstValueFrom } from 'rxjs';

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
  labels: string[] = [];
  datapoints: number[] = [];
  heading: string = '';

  @ViewChild('chart', { static: true }) chartRef!: ElementRef;

  constructor(private apiService: ApiService) {}

  async loadData() {
    this.salesData = await firstValueFrom(this.apiService.getSalesData());
    const { labels, datasets } = this.salesData?.data ?? {};

    this.labels = labels;
    this.datapoints = datasets?.data;
    this.heading = datasets?.label;
  }

  drawChart(): void {
    if (!this.labels || !this.datapoints) return;

    new Chart(this.chartRef.nativeElement, {
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

  ngOnInit(): void {
    this.apiService.getSalesData().subscribe({
      next: (res: any) => {
        this.salesData = res;

        const { labels, datasets } = this.salesData?.data || {};
        this.labels = labels;
        this.datapoints = datasets?.data;
        this.heading = datasets?.label;

        this.drawChart();
      },
      error: (err) => {
        console.error('Error loading sales data:', err);
      },
    });
  }
}
