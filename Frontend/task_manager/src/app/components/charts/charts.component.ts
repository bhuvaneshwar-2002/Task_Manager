import { Component, Input } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {
  @Input() chartType: string = 'line'; // Default chart type
  @Input() chartTitle: string = 'Chart Title';
  @Input() chartData: any[] = [10, 20, 30, 40, 50]; // Default data
  @Input() chartColors: string[] = ['#ff0000', '#00ff00', '#0000ff', '#ffcc00']; // Default colors
  @Input() width: number = 600; // Default width
  @Input() height: number = 400; // Default height

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any;

  constructor(private chartService: ChartService) {}

  ngOnInit() {
    this.chartOptions = this.chartService.getChartOptions(
      this.chartType, this.chartTitle, this.chartData, this.chartColors, this.width, this.height
    );
  }
}

// chartData = [
//   { name: 'Category A', y: 40 },
//   { name: 'Category B', y: 30 },
//   { name: 'Category C', y: 20 },
//   { name: 'Category D', y: 10 }
// ];

// colors = ['#FF5733', '#33FF57', '#3357FF', '#FFC300'];