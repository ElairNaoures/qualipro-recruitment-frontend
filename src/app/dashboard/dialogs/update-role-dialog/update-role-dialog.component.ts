import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { RoleModel } from '../../../shared/models/Role.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { RoleService } from '../../../shared/services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInput } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-role-dialog',
  templateUrl: './update-role-dialog.component.html',
  styleUrl: './update-role-dialog.component.scss'
})


export class UpdateRoleDialogComponent  implements OnInit {
  roleForm!: FormGroup;
  roleToUpdate: RoleModel = {};

  constructor(
    public dialogRef: MatDialogRef<UpdateRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoleModel,
    private roleService: RoleService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { 
    this.roleForm = this.fb.group({
      roleName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.roleToUpdate = { ...this.data };
    }
    console.log("roleToUpdate",this.roleToUpdate)
    }

  updateRole(): void {
    this.roleToUpdate.roleName= this.roleForm?.get('roleName')?.value;

    if (this.roleToUpdate && this.roleToUpdate.id !== undefined) {
      this.roleService.updateRole(this.roleToUpdate.id, this.roleToUpdate).subscribe({
        next: (updatedRole: RoleModel) => {
          console.log('Updated Role:', updatedRole);
          this.dialogRef.close(true);
          this.snackBar.open('Le rôle a été mis à jour avec succès', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du rôle:', error);
        }
      });
    } else {
      console.error('Le rôle ou son ID est indéfini.');
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}