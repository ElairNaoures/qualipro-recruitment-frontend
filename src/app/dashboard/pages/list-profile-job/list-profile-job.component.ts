import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProfileJobModel } from '../../../shared/models/profile-job-model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProfileJobService } from '../../../shared/services/profile-job.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProfileJobDialogComponent } from '../../dialogs/delete-profile-job-dialog/delete-profile-job-dialog.component';
import { UpdateProfileJobDialogComponent } from '../../dialogs/update-profile-job-dialog/update-profile-job-dialog.component';

@Component({
  selector: 'app-list-profile-job',
  templateUrl: './list-profile-job.component.html',
  styleUrl: './list-profile-job.component.scss'
})
export class ListProfileJobComponent implements OnInit {
  displayedColumns: string[] = ['id', 'profileName', 'ajouterQuiz', 'actions'];
  dataSource: MatTableDataSource<ProfileJobModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private profileJobService: ProfileJobService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadProfileJobs();
  }

  loadProfileJobs(): void {
    this.profileJobService.getAllProfileJobs().subscribe(
      (data: ProfileJobModel[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error loading profileJobs:', error);
      }
    );
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

  openAddProfileJob(): void {
    this.router.navigate(['dashboard/addProfileJob']);
  }

  openDeleteProfileJob(profileJobId: number): void {
    const dialogRef = this.dialog.open(DeleteProfileJobDialogComponent, {
      width: '400px',
      data: { profileJobId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProfileJobs();
      }
    });
  }

  openUpdateProfileJob(profileJob: ProfileJobModel) {
    const dialog = this.dialog.open(UpdateProfileJobDialogComponent, {
      data: profileJob,
    });

    dialog.afterClosed().subscribe(() => {
      this.loadProfileJobs();
    });
  }

  addQuiz(profileJobId: number): void {
    this.router.navigate(['dashboard/addQuiz', profileJobId]);
  }
}

