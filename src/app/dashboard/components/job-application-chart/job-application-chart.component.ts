import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { JobApplicationService } from '../../../shared/services/job-application.service';

@Component({
  selector: 'app-job-application-chart',
  templateUrl: './job-application-chart.component.html',
  styleUrls: ['./job-application-chart.component.scss']
})
export class JobApplicationChartComponent implements OnInit {
  @ViewChild('chartCanvas') private chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | undefined;
  jobTitles: string[] = [];
  applicationCounts: number[] = [];

  constructor(private jobApplicationService: JobApplicationService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadJobApplications();
  }

  loadJobApplications(): void {
    this.jobApplicationService.getJobsWithApplicationCount().subscribe(data => {
      console.log('Data received:', data);

      if (!Array.isArray(data)) {
        console.error('Data is not an array.');
        return;
      }

      const rawData = data;
      console.log('Raw data:', rawData);

      const filteredData = rawData.filter(job => job.title && job.applicationCount != null);

      console.log('Filtered data:', filteredData);

      if (filteredData.length === 0) {
        console.error('No valid job data available for chart.');
        return;
      }

      this.jobTitles = filteredData.map(job => job.title);
      this.applicationCounts = filteredData.map(job => job.applicationCount);

      console.log('Job Titles:', this.jobTitles);
      console.log('Application Counts:', this.applicationCounts);

      this.createChart();
    });
  }

  createChart(): void {
    if (!this.chartCanvas) {
      console.error('Chart canvas not found!');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    console.log('Canvas element:', this.chartCanvas.nativeElement);

    if (this.jobTitles.length === 0 || this.applicationCounts.length === 0) {
      console.error('No data available to create the chart.');
      return;
    }

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.jobTitles,
        datasets: [
          {
            label: 'Nombre de candidatures',
            data: this.applicationCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
