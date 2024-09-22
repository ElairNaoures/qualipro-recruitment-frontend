import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CondidatService } from '../../../shared/services/condidat.service';
import { MatDialog } from '@angular/material/dialog';
import { CondidatModel } from '../../../shared/models/Condidat.model';
import { DeleteCondidatDialogComponent } from '../../dialogs/delete-condidat-dialog/delete-condidat-dialog.component';


export interface CondidatData {
  id: number ;
  summary: string ;
  firstName: string ;
  lastName: string ;
  country: string ;
  phoneNumber: string ;
  birthdate:  Date;
  imageFileName?: string;

  cvFileName?: string;
  
 
}
@Component({
  selector: 'app-list-condidat',
  templateUrl: './list-condidat.component.html',
  styleUrl: './list-condidat.component.scss'
})
export class ListCondidatComponent implements OnInit {
  displayedColumns: string[] = ['id','summary', 'firstName', 'lastName', 'country', 'phoneNumber', 'birthdate' ,'cvFileName', 'actions'];

  dataSource: MatTableDataSource<CondidatData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private condidatService: CondidatService , private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllCondidats();
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
  getAllCondidats() {
    this.condidatService.getAllCondidats().subscribe({
      next: (res: CondidatModel[]) => { 
        const condidatData: CondidatData[] = res.map(condidat => ({
          id: condidat.id || 0,
          summary: condidat.summary|| '',
          firstName: condidat.firstName|| '',
          lastName: condidat.lastName || '',
          country: condidat.country || '',
          phoneNumber: condidat.phoneNumber|| '',
          birthdate: condidat.birthdate || new Date(),
          imageFileName: condidat.imageFileName || '',

          cvFileName: condidat.cvFileName || '',
        }));
        this.dataSource.data = condidatData;
        console.log(this.dataSource.data);
      },
      error: (err: any) => { 
        console.log('Error:', err);
      },
      complete: () => {} 
    });
  }

  openDeleteCondidat(condidatId: number){
    this.dialog.open(DeleteCondidatDialogComponent, {
     data: { condidatId: condidatId }
   });
 }

 getImagePath(fileName: string): string {
  return `http://localhost:5000/UploadedImages/${fileName}`;
}

}