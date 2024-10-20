import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { JobApplicationService } from '../../../shared/services/job-application.service';

@Component({
  selector: 'app-condidat-moyen-chart',
  templateUrl: './condidat-moyen-chart.component.html',
  styleUrls: ['./condidat-moyen-chart.component.scss']
})
export class CondidatMoyenChartComponent implements OnInit {
  @ViewChild('chartCanvas') private chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart<'doughnut', number[], string>;
  chartData: { jobTitle: string, bestCandidate: { candidateName: string, score: number } }[] = []; // Updated data structure

  // Color palette for the chart
  private colorPalette = [
    'rgba(75, 192, 192, 0.6)',  // Teal
    'rgba(255, 99, 132, 0.6)',  // Red
    'rgba(255, 205, 86, 0.6)',  // Yellow
    'rgba(54, 162, 235, 0.6)',   // Blue
    'rgba(153, 102, 255, 0.6)',  // Purple
    'rgba(255, 159, 64, 0.6)',   // Orange
    'rgba(201, 203, 207, 0.6)',  // Grey
  ];

  constructor(private jobApplicationService: JobApplicationService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadCandidatesWithScore();
  }

  loadCandidatesWithScore(): void {
    this.jobApplicationService.getCandidatesWithHighestScore().subscribe(data => {
      console.log('Data received:', data);

      if (!Array.isArray(data)) {
        console.error('Data is not an array.');
        return;
      }

      this.chartData = data;

      if (this.chartData.length === 0) {
        console.error('No valid candidate data available for chart.');
        return;
      }

      this.createChart();
    }, error => {
      console.error('Error fetching data:', error);
    });
  }

  // Function to generate a color for each job title
  getColorForJobTitle(jobTitle: string, index: number): string {
    return this.colorPalette[index % this.colorPalette.length]; // Cycle through the color palette
  }

  createChart(): void {
    if (!this.chartCanvas) {
      console.error('Chart canvas not found!');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    const labels: string[] = [];
    const data: number[] = [];
    const backgroundColors: string[] = [];

    // A map to store the index of each job title
    const jobTitleIndexMap: { [key: string]: number } = {};

    this.chartData.forEach((item, index) => {
      const color = this.getColorForJobTitle(item.jobTitle, index);

      // Add data for the highest-scoring candidate for each job
      labels.push(`${item.bestCandidate.candidateName} (${item.jobTitle})`);
      data.push(item.bestCandidate.score);
      backgroundColors.push(color);
    });

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Scores',
            data: data,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace('0.6', '1')), // Adjust border color
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
              }
            }
          }
        }
      }
    });
  }
}
