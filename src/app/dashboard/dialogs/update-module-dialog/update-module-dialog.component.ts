import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleModel } from '../../../shared/models/module.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModuleService } from '../../../shared/services/module.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-module-dialog',
  templateUrl: './update-module-dialog.component.html',
  styleUrl: './update-module-dialog.component.scss'
})
export class UpdateModuleDialogComponent implements OnInit {
  moduleForm!: FormGroup;
  moduleToUpdate: ModuleModel = {};

  constructor(
    public dialogRef: MatDialogRef<UpdateModuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModuleModel,
    private moduleService: ModuleService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { 
    this.moduleForm = this.fb.group({
      moduleName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.moduleToUpdate = { ...this.data };
    }
    console.log("moduleToUpdate",this.moduleToUpdate)
    }

  updateModule(): void {
    this.moduleToUpdate.moduleName= this.moduleForm?.get('moduleName')?.value;

    if (this.moduleToUpdate && this.moduleToUpdate.id !== undefined) {
      this.moduleService.updateModule(this.moduleToUpdate.id, this.moduleToUpdate).subscribe({
        next: (updateModule: ModuleModel) => {
          console.log('Updated Module:', updateModule);
          this.dialogRef.close(true);
          this.snackBar.open('Le module a été mis à jour avec succès', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du module:', error);
        }
      });
    } else {
      console.error('Le module ou son ID est indéfini.');
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}