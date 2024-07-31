import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { LoginInputModel } from '../../../shared/models/user-account-role.model';

@Component({
  selector: 'app-sign-in-admin',
  templateUrl: './sign-in-admin.component.html',
  styleUrl: './sign-in-admin.component.scss'
})
export class SignInAdminComponent implements OnInit {
  form!: FormGroup;
  // email: string = '';
  // password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  login() {
    const credentials: LoginInputModel = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };
    console.log(credentials);

    this.authService.signIn(credentials).subscribe(
      (response) => {
        if (response.success) {
          localStorage.setItem('token', response.accessToken!);
          this.router.navigate(['/dashboard']);
          console.log("Login successful");     
        } else {
          alert(response.message); // Show backend error message
        }
      },
      (error) => {
        console.error('Error:', error);
        if (error.status === 400) {
          alert('Invalid credentials. Please check your email and password.'); // Example error message for bad request
        } else {
          alert('An unexpected error occurred. Please try again later.'); // Generic error message
        }
      }
    );
  }
}

