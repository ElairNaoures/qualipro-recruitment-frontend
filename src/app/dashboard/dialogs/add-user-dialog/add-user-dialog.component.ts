import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from '../../../shared/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleData } from '../../pages/list-role/list-role.component';
import { RoleService } from '../../../shared/services/role.service';
import { RoleModel } from '../../../shared/models/Role.model';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss'
})
export class AddUserDialogComponent implements OnInit {

  myForm!: FormGroup;
  submitted = false;
  roleData: RoleData[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
    this.initForm();
  }

  addUser() {
    if (this.myForm.invalid) {
      return; // Ne pas soumettre le formulaire si les champs sont invalides
    }

    const user_data: UserModel = {
      firstName: this.myForm.get("firstName")?.value,
      lastName: this.myForm.get("lastName")?.value,
      country: this.myForm.get("country")?.value,
      phoneNumber: this.myForm.get("phoneNumber")?.value,
      birthdate: this.formatDate(this.myForm.get("birthdate")?.value), // Formater la date de naissance
    //  roleId: this.myForm.get("roleId")?.value,
    roleId: this.myForm.get("roleId")?.value,
    };

    this.userService.addUser(user_data).subscribe({
      next: res => {
        this.snackBar.open("Utilisateur ajouté avec succès ",  "ok", { duration: 3000 });
        this.dialogRef.close({ data: "success" });
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        if (err.status === 400) {
          this.snackBar.open("Erreur lors de l'ajout de l'utilisateur : Données incorrectes.",  "ok", { duration: 3000 });
        } else {
          this.snackBar.open("Une erreur s'est produite lors de l'ajout de l'utilisateur.",  "ok", { duration: 3000 });
        }
      }
    });
  }

  initForm() {  
    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthdate: ['', Validators.required],
      roleId: ['', Validators.required],
    });
  }

  formatDate(date: Date | null): string {
    if (!date) return ''; // Retourner une chaîne vide si la date est null
    // Formater la date au format 'YYYY-MM-DD'
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }
  

  closeDialog(): void {
    this.dialogRef.close(false);
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (res: RoleModel[]) => {
        this.roleData = res.map(role => ({
          id: role.id || 0,
          roleName: role.roleName || '',
        }));
      },
      error: err => {
        console.log('Error:', err);
      },
    });
  }
}