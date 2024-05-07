import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RoleService } from '../../../shared/services/role.service';
import { RoleModel } from '../../../shared/models/Role.model';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleDialogComponent } from '../../dialogs/add-role-dialog/add-role-dialog.component';
import { DeleteRoleDialogComponent } from '../../dialogs/delete-role-dialog/delete-role-dialog.component';
import { UpdateRoleDialogComponent } from '../../dialogs/update-role-dialog/update-role-dialog.component';



export interface RoleData {
  id: number;
  roleName: string;
}


@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss'],
})
export class ListRolesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'roleName', 'edit', 'delete'];
  dataSource: MatTableDataSource<RoleData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private roleService: RoleService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<RoleData>([]);
  }

  ngOnInit(): void {
    this.getAllRoles();
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

  getAllRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (res: RoleModel[]) => {
        const roleData: RoleData[] = res.map(role => ({
          id: role.id || 0,
          roleName: role.roleName || '',
        }));
        this.dataSource.data = roleData;
      },
      error: err => {
        console.log('Error:', err);
      },
    });
  }

  openAddRole() {
    this.dialog.open(AddRoleDialogComponent);
  }

  openDeleteRole(roleId: number) {
    this.dialog.open(DeleteRoleDialogComponent, {
      data: { roleId: roleId },
    });
    
  }

  openUpdateRole(role: RoleData) {
    const dialog = this.dialog.open(UpdateRoleDialogComponent, {
      data: role,
    });

    dialog.afterClosed().subscribe((res) => {  
      this.getAllRoles();
    })
  }
}