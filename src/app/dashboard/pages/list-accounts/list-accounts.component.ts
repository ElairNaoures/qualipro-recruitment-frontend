import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../../shared/services/account.service';
import { AccountModel } from '../../../shared/models/account.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddAccountDialogComponent } from '../../dialogs/add-account-dialog/add-account-dialog.component';
import { DeleteAccountDialogComponent } from '../../dialogs/delete-account-dialog/delete-account-dialog.component';
import { UpdateAccountDialogComponent } from '../../dialogs/update-account-dialog/update-account-dialog.component';




export interface AccountData {
  id: number ;
  email: string ;
  password: string ;
  blocked: Boolean ;


 // UserId?: number;
  
}


@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrl: './list-accounts.component.scss',
  
})
export class ListAccountsComponent  implements OnInit {


  displayedColumns: string[] = ['id', 'email', 'password', 'blocked', 'actions'];
  dataSource: MatTableDataSource<AccountModel>;

  selecteAccountId: number | undefined;
  account_data:AccountModel[]= [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(private accountService: AccountService,
    private dialog: MatDialog
  ) {
    
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
        const accountData: AccountModel[] = res.map(account => ({
      
          id: account.id || 0,
          email: account.email || '',
          password: account.password || '',
          blocked: account.blocked === true || account.blocked === false ? account.blocked : false, 
         
                   
        }));
        this.dataSource.data = accountData;
        console.log(this.dataSource.data);

      },
      error: err => {
        console.log('error', err);
      },
    });
  }
  
  
  openAddAccount(){
    this.dialog.open(AddAccountDialogComponent);
    this.visible = true;
}
visible: boolean = false;


openDeleteAccount(accountId: number){
  this.dialog.open(DeleteAccountDialogComponent, {
  data: { accountId: accountId }
});
}

openUpdateAccount(account: AccountData) {
  const dialog = this.dialog.open(UpdateAccountDialogComponent, {
    data: account,
  });

  dialog.afterClosed().subscribe((res) => {  
    this.getAllAccounts();
    })
  }


}