import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { UserModel } from '../../../shared/models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


export interface UserData {
  id: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  country: string | undefined;
  phoneNumber: string | undefined;
  birthdate: Date | undefined;
  
 // roleId: number | undefined;
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'country', 'phoneNumber', 'birthdate', 'edit', 'delete'];
  // displayedColumns: string[] = ['id', 'firstName', 'lastName', 'country', 'phoneNumber', 'birthdate', 'roleId'];

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllUsers();
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

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res: UserModel[]) => {
        console.log('list of users', res);
        const userData: UserData[] = res.map(user => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          country: user.country,
          phoneNumber: user.phoneNumber,
          birthdate: user.birthdate,
          edit: '',
          delete: ''
          //roleId: user.roleId
        }));
        this.dataSource.data = userData;
      },
      error: err => {
        console.log('error', err);
      },
    });
    console.log("data",this.dataSource.data);
    
  }  
}
