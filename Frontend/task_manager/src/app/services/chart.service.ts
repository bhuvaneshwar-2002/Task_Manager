import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC3D from 'highcharts/highcharts-3d';

// HC3D(Highcharts); // Enable 3D charts

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  getChartOptions(type: string, title: string, data: any[], colors: string[], width: number, height: number): any {
    return {
      chart: {
        type: type.includes('3d') ? type.replace('3d', '') : type,
        options3d: type.includes('3d') ? { enabled: true, alpha: 45, beta: 0 } : undefined,
        width: width,
        height: height
      },
      title: { text: title },
      plotOptions: {
        series: {
          cursor: 'pointer',
          events: {
            // legendItemClick: function (this: any) {
            //   const visibleSeries = this.chart.series.filter((s: any) => s.visible);
            //   if (visibleSeries.length === 1 && this.visible) {
            //     return false; // Prevent hiding the last visible series
            //   }
            // }
          }
        },
        pie: { allowPointSelect: true, depth: 35, colors: colors },
        bar: { colors: colors },
        line: { colors: colors },
        area: { colors: colors }
      },
      series: [{ name: title, data: data }],
      legend: { enabled: true }
    };
  }
}
