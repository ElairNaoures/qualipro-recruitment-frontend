import { Component, OnInit, ViewChild } from '@angular/core';
import { JobModel } from '../../../shared/models/job.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { JobService } from '../../../shared/services/job.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteJobDialogComponent } from '../../dialogs/delete-job-dialog/delete-job-dialog.component';
import { UpdateJobDialogComponent } from '../../dialogs/update-job-dialog/update-job-dialog.component';
import { AddJobDialogComponent } from '../../dialogs/add-job-dialog/add-job-dialog.component';
import { UserData } from '../list-users/list-users.component';
import { UserService } from '../../../shared/services/user.service';
import { UserModel } from '../../../shared/models/user.model';
import { JobData } from '../../../jobs/pages/list-jobs/list-jobs.component';



@Component({
  selector: 'app-list-job',
  templateUrl: './list-job.component.html',
  styleUrls: ['./list-job.component.scss']
})
export class ListJobComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'yearsOfExperience', 'languages', 'educationLevel', 'expirationDate', 'createdAt', 'fullName', 'actions'];
  dataSource: MatTableDataSource<JobData>;
  job_data: JobModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private jobservice: JobService, private dialog: MatDialog, private userService: UserService) {
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
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  
    // Vérifiez les données filtrées après l'application du filtre
    console.log('Filtered Data:', this.dataSource.filteredData);
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
        // Récupérer les identifiants uniques d'utilisateur
        const userIds: number[] = jobData.map(job => job.userId);
        const uniqueUserIds: number[] = Array.from(new Set(userIds));
  
        // Filtrer les userIds pour éviter les undefined
        const filteredUserIds = uniqueUserIds.filter(id => id !== undefined);
  
        this.fetchUserNames(filteredUserIds);
      },
      error: err => {
        console.log('Error:', err);
      },
    });
  }
  
  

  // fetchUserNames(userIds: number[]) {
  //   this.userService.getAllUserById(userIds).subscribe({
  //     next: (users: UserModel[]) => {
  //       const userMap = new Map<number, string>();
  //       users.forEach(user => {
  //         if (user.id !== undefined && user.firstName !== undefined) {
  //           userMap.set(user.id, user.firstName);
  //         }
  //       });
  
  //       const jobData = this.dataSource.data.map(job => ({
  //         ...job,
  //         firstName: userMap.get(job.userId) || 'Unknown'
  //       }));
  
  //       this.dataSource.data = jobData;
  //     },
  //     error: err => {
  //       console.log('Error fetching users:', err);
  //     }
  //   });
  // }
  
  
  
  fetchUserNames(userIds: number[]) {
    this.userService.getAllUserById(userIds).subscribe({
      next: (users: UserModel[]) => {
        const userMap = new Map<number, { firstName: string, lastName: string }>();
  
        users.forEach(user => {
          if (user.id !== undefined && user.firstName !== undefined && user.lastName !== undefined) {
            userMap.set(user.id, { firstName: user.firstName, lastName: user.lastName });
          }
        });
  
        const jobData = this.dataSource.data.map(job => ({
          ...job,
          firstName: userMap.has(job.userId) ? userMap.get(job.userId)!.firstName : 'Unknown',
          lastName: userMap.has(job.userId) ? userMap.get(job.userId)!.lastName : 'Unknown'
        }));
  
        this.dataSource.data = jobData;
      },
      error: err => {
        console.log('Error fetching users:', err);
      }
    });
  }
  
  



    openDeleteJob(jobId: number){
        this.dialog.open(DeleteJobDialogComponent, {
         data: { jobId: jobId }
       });
     }


     openUpdateJob(job: JobData) {
      if (job && job.id !== undefined) {
        const dialog = this.dialog.open(UpdateJobDialogComponent, {
          data: job,
          width: '900px',
        });
    
        dialog.afterClosed().subscribe((res) => {  
          if (res) {
            this.getAllJobs();
          }
        });
      } else {
        console.error("L 'emploi ou son ID est indéfini.");
      }
    }

    openAddJob(){

    let dialogRef =  this.dialog.open(AddJobDialogComponent, {
      width: '900px',
    });
      this.visible = true;
      dialogRef.afterClosed().subscribe((res) => {

        if (res.data == "success") {
this.getAllJobs();
        }
      });
  }

  
  visible: boolean = false;
    
  }