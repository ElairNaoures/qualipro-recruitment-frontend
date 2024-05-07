import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../../shared/services/account.service';
import { AccountModel } from '../../../shared/models/account.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';




export interface AccountData {
  id: number | undefined;
  email: string | undefined;
  password: string | undefined;
  blocked: Boolean | undefined;


 // UserId?: number;
  
}


@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrl: './list-accounts.component.scss',
  // standalone: true,
  // imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
})
export class ListAccountsComponent  implements OnInit {


  displayedColumns: string[] = ['id', 'Email', 'Password', 'Blocked',  'edit', 'delete'];
  dataSource: MatTableDataSource<AccountData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  accountsList: AccountModel[] = [];
  
  constructor(private accountService: AccountService) {
    
    this.dataSource = new MatTableDataSource();

  }

  ngOnInit(): void {
    this.getAllAccounts();
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


  getAllAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (res: AccountModel[]) => {
        console.log('list of accounts', res);
        const accountData: AccountData[] = res.map(account => ({
          id: account.id,
          email: account.email,
          password: account.password,
          blocked: account.blocked,
          edit: '',
          delete: ''

         
          
        }));
        this.dataSource.data = accountData;
      },
      error: err => {
        console.log('error', err);
      },
    });
  }  
}

// /** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };
// }