import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-information-perso-user',
  templateUrl: './information-perso-user.component.html',
  styleUrl: './information-perso-user.component.scss'
})
export class InformationPersoUserComponent implements OnInit {
  userForm: FormGroup;
  @Input() userId: number = 0;
  selectedImageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
     
      country: [''],
      phoneNumber: [''],
      birthdate: [''],
      
    });
  }

  onFileSelect(event: Event, fileType: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (fileType === 'image') {
        this.selectedImageFile = input.files[0];
      }
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      if (userId) {
        this.userId = +userId;
        this.loadUser();
      }
    });
  }

  loadUser(): void {
    if (this.userId !== undefined) {
      this.userService.getUserById(this.userId).subscribe(user => {
        this.userForm.patchValue(user);
      }, error => {
        console.error('Error fetching User:', error);
        this.snackBar.open('Error loading User', 'Close', { duration: 3000 });
      });
    }
  }

  // onSubmit(): void {
  //   if (this.userForm.valid) {
  //     const formData = new FormData();
  
  //     // Append form fields
  //     formData.append('id', this.userId.toString());  // Ensure ID is passed for updating
  //     formData.append('firstName', this.userForm.get('firstName')?.value);
  //     formData.append('lastName', this.userForm.get('lastName')?.value);
  //     formData.append('country', this.userForm.get('country')?.value);
  //     formData.append('phoneNumber', this.userForm.get('phoneNumber')?.value);
  //     formData.append('birthdate', this.userForm.get('birthdate')?.value);
  
  //     // Append files if they are selected
  //     if (this.selectedImageFile) {
  //       formData.append('imageFile', this.selectedImageFile);
  //     }
  
      
  
  //     // Send the form data to the service method
  //     this.userService.updateUser(this.userId, formData).subscribe(
  //       response => {
  //         console.log('user updated successfully:', response);
  //         this.snackBar.open('user updated successfully', 'Close', { duration: 3000 });
  //       },
  //       error => {
  //         console.error('Error updating user:', error);
  //         this.snackBar.open('Error updating user', 'Close', { duration: 3000 });
  //       }
  //     );
  //   } else {
  //     console.error('Form is not valid');
  //     this.snackBar.open('Form is not valid', 'Close', { duration: 3000 });
  //   }
  // }
  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = new FormData();
  
      // Append form fields
      formData.append('id', this.userId.toString());
      formData.append('firstName', this.userForm.get('firstName')?.value);
      formData.append('lastName', this.userForm.get('lastName')?.value);
      formData.append('country', this.userForm.get('country')?.value);
      formData.append('phoneNumber', this.userForm.get('phoneNumber')?.value);
      formData.append('birthdate', this.userForm.get('birthdate')?.value);
  
      // Conditionally append roleName only if it is not null or empty
      const roleName = this.userForm.get('roleName')?.value;
      if (roleName) {
        formData.append('roleName', roleName);
      }
  
      // Append files if they are selected
      if (this.selectedImageFile) {
        formData.append('imageFile', this.selectedImageFile);
      }
  
      // Send the form data to the service method
      this.userService.updateUser(this.userId, formData).subscribe(
        response => {
          console.log('User updated successfully:', response);
          this.snackBar.open('User updated successfully', 'Close', { duration: 3000 });
        },
        error => {
          console.error('Error updating user:', error);
          this.snackBar.open('Error updating user', 'Close', { duration: 3000 });
        }
      );
    } else {
      console.error('Form is not valid');
      this.snackBar.open('Form is not valid', 'Close', { duration: 3000 });
    }
  }
  
  navigateToJobList(): void {
    this.router.navigate(['/dashboard/EmploisDemander/list'], { queryParams: { userId: this.userId } }); 
  }
}

