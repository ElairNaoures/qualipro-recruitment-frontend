import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContractTypeService } from '../../../shared/services/contract-type.service';
import { MatDialog } from '@angular/material/dialog';
import { ContractTypeModel } from '../../../shared/models/ContractType.model';
import { AddContactTypeDialogComponent } from '../../dialogs/add-contact-type-dialog/add-contact-type-dialog.component';
import { DeleteContactTypeDialogComponent } from '../../dialogs/delete-contact-type-dialog/delete-contact-type-dialog.component';




export interface ContractTypeData {
  id: number;
  designation: string;
  createdAt: Date | null;
}


@Component({
  selector: 'app-list-contract-types',
  templateUrl: './list-contract-types.component.html',
  styleUrl: './list-contract-types.component.scss'
})
export class ListContractTypesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'designation', 'createdAt', 'actions'];



  selecteContractTypeId: number | undefined;

  dataSource: MatTableDataSource<ContractTypeData>;

  
  contractType_data: ContractTypeModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private contractTypeservice: ContractTypeService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllContractTypes();
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

  getAllContractTypes() {
    this.contractTypeservice.getAllContractTypes().subscribe({
      next: (res: ContractTypeModel[]) => {
        const contractTypeData: ContractTypeData[] = res.map(contract => ({
          id: contract.id || 0,
          designation: contract.designation || '',
         
          createdAt: contract.createdAt || new Date(),
        }));
        this.dataSource.data = contractTypeData;
        console.log(this.dataSource.data);
      },
      error: err => {
        console.log('Error:', err);
      },
    });
  }

  openAddContractType(){

    let dialogRef =  this.dialog.open(AddContactTypeDialogComponent);
      this.visible = true;
      dialogRef.afterClosed().subscribe((res) => {

        if (res.data == "success") {
this.getAllContractTypes();
        }
      });
  }
  visible: boolean = false;
    

  openDeleteContractType(contractTypeId: number){
    this.dialog.open(DeleteContactTypeDialogComponent, {
    data: { contractTypeId: contractTypeId

      ,
     }
  });
  }
  }