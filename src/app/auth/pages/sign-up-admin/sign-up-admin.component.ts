import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleData } from '../../../dashboard/pages/list-role/list-role.component';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { RoleService } from '../../../shared/services/role.service';
import { UserAccountRoleModel } from '../../../shared/models/user-account-role.model';
import { RoleModel } from '../../../shared/models/Role.model';

@Component({
  selector: 'app-sign-up-admin',
  templateUrl: './sign-up-admin.component.html',
  styleUrl: './sign-up-admin.component.scss'
})
export class SignUpAdminComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  roleData: RoleData[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8)]],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthdate: ['', Validators.required],
      roleId: ['', Validators.required],
      blocked: [false],
    });
  }

  onSubmit() {
    this.submitted = true;
  
    if (this.registerForm.invalid) {
      return;
    }
  
    const formData: UserAccountRoleModel = {
      ...this.registerForm.value,
      blocked: false 
    };
  
    this.authService.register(formData).subscribe(
      (response) => {
        console.log('Inscription réussie !', response);
        this.router.navigate(['/dashboard/modules/list']);
      },
      (error) => {
        console.error('Erreur lors de l\'inscription:', error);
        // Gestion de l'erreur (affichage ou redirection vers une page d'erreur)
      }
    );
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
