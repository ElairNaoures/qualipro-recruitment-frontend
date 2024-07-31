import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { UserModel } from '../../../shared/models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AddUserDialogComponent } from '../../dialogs/add-user-dialog/add-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from '../../dialogs/delete-user-dialog/delete-user-dialog.component';


export interface UserData {
  id: number ;
  firstName: string ;
  lastName: string ;
  country: string ;
  phoneNumber: string ;
  birthdate: string ;
  roleName: string ;
  
  
 // roleId: number | undefined;
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'country', 'phoneNumber', 'birthdate','roleName' , 'actions'];

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService , private dialog: MatDialog) {
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
        console.log('Users from API:', res); // Vérifiez les données de l'utilisateur reçues
        const userData: UserData[] = res.map(user => ({
          id: user.id || 0,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          country: user.country || '',
          phoneNumber: user.phoneNumber || '',
          birthdate: user.birthdate || '',
          roleName: user.roleName || '', 
                }));
        this.dataSource.data = userData;
        console.log('DataSource:', this.dataSource.data); // Vérifiez les données affectées à dataSource
      },
      error: (err: any) => {
        console.error('Error fetching users:', err); // Loguez l'erreur
      },
      complete: () => {}
    });
  }
  
  
  openDeleteUser(userId: number){
    this.dialog.open(DeleteUserDialogComponent, {
     data: { userId: userId }
   });
 }

  
  


  
  openAddUser(){

    let dialogRef =  this.dialog.open(AddUserDialogComponent);
      this.visible = true;
      dialogRef.afterClosed().subscribe((res) => {

        if (res.data == "success") {
this.getAllUsers();
        }
      });
  }

  visible: boolean = false;
}
