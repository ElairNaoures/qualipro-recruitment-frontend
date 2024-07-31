import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { UserAccountRoleModel } from '../../../shared/models/user-account-role.model';
import { RoleData } from '../../../dashboard/pages/list-role/list-role.component';
import { RoleService } from '../../../shared/services/role.service';
import { RoleModel } from '../../../shared/models/Role.model';
import { CondidatModel } from '../../../shared/models/Condidat.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  //roleData: RoleData[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    //private roleService: RoleService
  ) {}

  ngOnInit(): void {
    //this.getAllRoles();
    this.registerForm = this.formBuilder.group({
      summary:['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8)]],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthdate: ['', Validators.required],
 blocked: [false],
    });
  }

  onSubmit() {
    this.submitted = true;
  
    if (this.registerForm.invalid) {
      return;
    }
  
    const formData: CondidatModel = {
      ...this.registerForm.value,
      blocked: false // Vous pouvez ajouter cette propriété si nécessaire
    };
  
    this.authService.registerCondidat(formData).subscribe(
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


  // getAllRoles() {
  //   this.roleService.getAllRoles().subscribe({
  //     next: (res: RoleModel[]) => {
  //       this.roleData = res.map(role => ({
  //         id: role.id || 0,
  //         roleName: role.roleName || '',
  //       }));
  //     },
  //     error: err => {
  //       console.log('Error:', err);
  //     },
  //   });
  // }
}
