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
  chartData: { jobTitle: string, candidates: { candidateName: string, score: number }[] }[] = [];

  constructor(private jobApplicationService: JobApplicationService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadCandidatesWithScore();
  }

  loadCandidatesWithScore(): void {
    this.jobApplicationService.getCandidatesWithScoreAboveThreshold().subscribe(data => {
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

  // Function to generate a color based on job title
  getColorForJobTitle(jobTitle: string): string {
    const colorMap: { [key: string]: string } = {
      'job': 'rgba(75, 192, 192, 0.2)',
      'job test': 'rgba(255, 99, 132, 0.2)',
      'default': 'rgba(153, 102, 255, 0.2)'
    };

    return colorMap[jobTitle] || colorMap['default'];
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

    this.chartData.forEach(group => {
      const color = this.getColorForJobTitle(group.jobTitle);

      group.candidates.forEach(candidate => {
        labels.push(`${candidate.candidateName} (${group.jobTitle})`);
        data.push(candidate.score);
        backgroundColors.push(color);
      });
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
            borderColor: backgroundColors.map(color => color.replace('0.2', '1')),
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
