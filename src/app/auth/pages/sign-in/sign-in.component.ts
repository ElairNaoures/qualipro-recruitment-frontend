// src/app/components/sign-in/sign-in.component.ts

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { LoginInputModelCondidat, LoginResponseModelCondidat } from '../../../shared/models/Condidat.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/jobs/candidatedetail']); 
    }
  }

  login(): void {
    if (this.form.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const credentials: LoginInputModelCondidat = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };

    this.authService.signInCondidat(credentials).subscribe(
      (response: LoginResponseModelCondidat) => {
        if (response.success) {
          localStorage.setItem('token', response.accessToken!);

          // Assurez-vous que `response.condidatInfo` contient `CondidatId`
          const condidatId = response.condidatInfo?.condidatId;

          if (condidatId) {
            this.router.navigate([`/jobs/candidatedetail/${condidatId}`]);
          } else {
            console.error('Candidate ID is not available.');
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
