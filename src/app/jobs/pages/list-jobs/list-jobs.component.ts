import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { JobModel } from '../../../shared/models/job.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { JobService } from '../../../shared/services/job.service';

export interface JobData {
  id: number;
  title: string;
  description: string;
  yearsOfExperience: string;
  languages: string;
  educationLevel: string;
  expirationDate: Date;
  createdAt: Date;
 // firstName: string;
 userId: number;
  firstName: string;
  lastName: string;

  
}

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.scss']
})
export class ListJobsComponent implements OnInit { 
  displayedColumns: string[] = ['id', 'title', 'description', 'yearsOfExperience', 'languages', 'educationLevel', 'expirationDate', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<JobData>;

  selectedJobId: number | undefined;
  job_data: JobModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private jobservice: JobService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllJobs();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllJobs() {
    this.jobservice.getAllJobs().subscribe({
      next: (res: JobModel[]) => {
        const jobData: JobData[] = res.map(job => ({
          id: job.id || 0,
          title: job.title || '',
          description: job.description || '',
          yearsOfExperience: job.yearsOfExperience || '',
          languages: job.languages || '',
          educationLevel: job.educationLevel || '',
          expirationDate: job.expirationDate || new Date(),
          createdAt: job.createdAt || new Date(),
          userId: job.userId || 0,
          firstName: '',
          lastName: '',
        }));
        this.dataSource.data = jobData;
        console.log(this.dataSource.data);
      },
      error: err => {
        console.log('Error:', err);
      },
    });
  }
    // openDeleteJob(jobId: number){
    //     this.dialog.open(DeleteJobDialogComponent, {
    //      data: { jobId: jobId }
    //    });
    //  }
  // openUpdateJob(job: JobData) {
  //   const dialog = this.dialog.open(UpdateJobDialogComponent, {
  //     data: job,
  //   });
  //   dialog.afterClosed().subscribe((res) => {  
  //     this.getAllJobs();
  //     })
  //   }
  
  
    visible: boolean = false;
}
