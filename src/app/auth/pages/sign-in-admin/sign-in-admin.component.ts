import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { LoginInputModel, LoginResponseModel } from '../../../shared/models/user-account-role.model';
import { Observable } from 'rxjs';
import { SIDENAV_MENU_ITEMS, SideNavMenuModel } from '../../../shared/constants/sidenav-items';

@Component({
  selector: 'app-sign-in-admin',
  templateUrl: './sign-in-admin.component.html',
  styleUrl: './sign-in-admin.component.scss'
})
export class SignInAdminComponent implements OnInit {
  form!: FormGroup;
 
  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      // L'utilisateur est déjà authentifié
      const roleName = localStorage.getItem('roleName');
      if (roleName) {
        this.setSideNavMenu(roleName);
      }
    }
  }
  login(): void {
    if (this.form.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const credentials: LoginInputModel = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };

    this.authService.signIn(credentials).subscribe(
      (response: LoginResponseModel) => {
        if (response.success) {
          // Stocker le jeton dans localStorage
          localStorage.setItem('token', response.accessToken!);

          const userInfo = response.userInfo;
          if (userInfo && userInfo.userId && userInfo.roleId) {
            // Stocker le roleId dans localStorage
            localStorage.setItem('roleId', userInfo.roleId.toString());

            // Obtenir le nom du rôle
            this.authService.getRoleNameById(userInfo.roleId).subscribe(
              (roleResponse) => {
                // Stocker le roleName dans localStorage
                localStorage.setItem('roleName', roleResponse.roleName);

                // Configurer le menu de navigation latérale
                this.setSideNavMenu(roleResponse.roleName);

                // Rediriger vers le tableau de bord avec l'ID utilisateur
                this.router.navigate([`/dashboard/updateinformation/${userInfo.userId}`]);
              },
              (error) => {
                console.error('Error fetching role name:', error);
                alert('An unexpected error occurred while fetching role name.');
              }
            );
          } else {
            console.error('User ID or role ID is not available.');
            alert('An unexpected error occurred. Please try again later.');
          }
        } else {
          alert(response.message);
        }
      },
      (error) => {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
      }
    );
  }

  // Fonction pour configurer le menu en fonction du rôle de l'utilisateur
  setSideNavMenu(roleName: string): void {
    // Selon le rôle, sélectionnez le menu approprié
    let selectedMenu: SideNavMenuModel[] = [];
    if (roleName === 'Admin') {
      selectedMenu = SIDENAV_MENU_ITEMS.filter(item => item); // Menu complet pour Admin
    } else if (roleName === 'Recruteur') {
      selectedMenu = SIDENAV_MENU_ITEMS.filter(item => item.route?.includes('dashboard/jobs')); // Filtrage pour Recruteur
    }

    // Vous pouvez maintenant utiliser `selectedMenu` dans votre application
    console.log('Selected Menu:', selectedMenu);
  }

  
  getRoleName(roleId: number): Observable<any> {
    return this.authService.getRolename(roleId);
  }
  
  }
 