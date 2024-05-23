import { Component, OnInit, ViewChild } from '@angular/core';
import { ModuleModel } from '../../../shared/models/module.model';
import { ModuleService } from '../../../shared/services/module.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddModuleDialogComponent } from '../../dialogs/add-module-dialog/add-module-dialog.component';
import { DeleteModuleDialogComponent } from '../../dialogs/delete-module-dialog/delete-module-dialog.component';
import { UpdateModuleDialogComponent } from '../../dialogs/update-module-dialog/update-module-dialog.component';
import { RoleModel } from '../../../shared/models/Role.model';

export interface ModuleData {
  id: number ;
  moduleName: string ;
}

@Component({
  selector: 'app-list-module',
  templateUrl: './list-module.component.html',
  styleUrl: './list-module.component.scss',
  // standalone: true,
  // imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
})
export class ListModuleComponent implements OnInit {
  displayedColumns: string[] = ['id', 'moduleName', 'actions'];

  dataSource: MatTableDataSource<ModuleModel>;

  selecteModuleId: number | undefined;
  module_data:ModuleModel[]= [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private moduleservice: ModuleService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
  }

  

  ngOnInit(): void {
    this.getAllModules();
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

  getAllModules() {
    this.moduleservice.getAllModules().subscribe({
      next: (res: ModuleModel[]) => {
        const roleData: ModuleModel[] = res.map(role => ({
          id: role.id || 0,
          moduleName: role.moduleName || '',
        }));
        this.dataSource.data = roleData;
        console.log(this.dataSource.data);
      },
      error: err => {
        console.log('Error:', err);
      },
    });
  }

  openAddModule(){
      this.dialog.open(AddModuleDialogComponent);
      this.visible = true;
  }

  openDeleteModule(moduleId: number){
    this.dialog.open(DeleteModuleDialogComponent, {
    data: { moduleId: moduleId }
  });
}

openUpdateModule(module: ModuleData) {
  const dialog = this.dialog.open(UpdateModuleDialogComponent, {
    data: module,
  });

  dialog.afterClosed().subscribe((res) => {  
    this.getAllModules();
    })
  }


  visible: boolean = false;

}


