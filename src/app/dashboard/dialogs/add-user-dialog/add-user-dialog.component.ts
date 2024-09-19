import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from '../../../shared/services/role.service';
import { RoleModel } from '../../../shared/models/Role.model';
import { UserAccountRoleModel } from '../../../shared/models/user-account-role.model';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {

 
  myForm!: FormGroup;
  roleData: RoleModel[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private roleService: RoleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
    this.initForm();
  }

  initForm() {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required],

      birthdate: ['', Validators.required],
      roleId: ['', Validators.required]
    });
  }

  addUser() {
    if (this.myForm.invalid) {
      console.log('Form is invalid:', this.myForm.errors);
      return;
    }

    const userData: UserAccountRoleModel = {
      ...this.myForm.value,
      blocked: false 
    };
        // Vérifier si roleId est bien sélectionné
        if (!userData.roleId) {
          console.error('Aucun rôle sélectionné');
          this.snackBar.open('Veuillez sélectionner un rôle', 'Fermer', { duration: 3000 });
          return;
        }
    console.log('Sending user data:', userData);

    this.authService.register(userData).subscribe(
      response => {
        console.log('Ajout réussi !', response);
        this.dialogRef.close(true);
      },
      error => {
        console.error('Erreur lors de l\'inscription:', error);
        this.snackBar.open('Erreur lors de l\'inscription', 'Fermer', { duration: 3000 });
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (res: RoleModel[]) => {
        this.roleData = res;
      },
      error: err => {
        console.log('Error:', err);
      }
    });
  }
}