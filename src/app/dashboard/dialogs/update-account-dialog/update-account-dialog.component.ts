import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountModel } from '../../../shared/models/account.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../../shared/services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-account-dialog',
  templateUrl: './update-account-dialog.component.html',
  styleUrl: './update-account-dialog.component.scss'
})
export class UpdateAccountDialogComponent implements OnInit {
  accountForm!: FormGroup;
  accountToUpdate: AccountModel = { id: 0, email: '', password: '', blocked: false };

  constructor(
    public dialogRef: MatDialogRef<UpdateAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccountModel,
    private accountService: AccountService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { 
    this.accountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      blocked: [false]
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.accountToUpdate = { ...this.data };
      this.accountForm.patchValue(this.accountToUpdate);
    }
    console.log("accountToUpdate", this.accountToUpdate);
  }

  updateAccount(): void {
    this.accountToUpdate.email = this.accountForm?.get('email')?.value;
    this.accountToUpdate.password = this.accountForm?.get('password')?.value;
    this.accountToUpdate.blocked = this.accountForm?.get('blocked')?.value;

    if (this.accountToUpdate && this.accountToUpdate.id !== undefined) {
      this.accountService.updateAccount(this.accountToUpdate.id, this.accountToUpdate).subscribe({
        next: (updatedAccount: AccountModel) => {
          console.log('Updated Account:', updatedAccount);
          this.dialogRef.close(true);
          this.snackBar.open('Le compte a été mis à jour avec succès', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du compte:', error);
        }
      });
    } else {
      console.error('Le compte ou son ID est indéfini.');
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }


  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
