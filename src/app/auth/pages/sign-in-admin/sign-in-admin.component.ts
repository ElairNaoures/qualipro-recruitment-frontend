import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { LoginInputModel, LoginResponseModel } from '../../../shared/models/user-account-role.model';

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
      //this.router.navigate(['/dashboard/updateinformation']); // Cette ligne n'est plus nécessaire si vous ne redirigez pas sans ID
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
            localStorage.setItem('token', response.accessToken!);
  
            // Assurez-vous que `response.userInfo` contient `UserId`
            const userId = response.userInfo?.userId;
  
            if (userId) {
              this.router.navigate([`/dashboard/updateinformation/${userId}`]);
            } else {
              console.error('user ID is not available.');
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
  }
 