import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillModel } from '../../../shared/models/skill-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SkillService } from '../../../shared/services/skill.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-skill-dialog',
  templateUrl: './update-skill-dialog.component.html',
  styleUrl: './update-skill-dialog.component.scss'
})
export class UpdateSkillDialogComponent implements OnInit{

  skillForm!: FormGroup;
  skillToUpdate: SkillModel = {
    id: 0,
    name: '',
    technicalSkill: false, 
    softSkill: false,       
    toolsSkill: false  
   
  };

  constructor(
    public dialogRef: MatDialogRef<UpdateSkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SkillModel,
    private skillService: SkillService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      technicalSkill: [false, Validators.required],  
      softSkill: [false, Validators.required],       
      toolsSkill: [false, Validators.required],   
      
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.skillToUpdate = { ...this.data };
      this.skillForm.patchValue(this.skillToUpdate);
    }
    console.log("skillToUpdate",this.skillToUpdate)
    }

    updateSkill(): void {
     
      this.skillToUpdate.name = this.skillForm?.get('name')?.value;
      this.skillToUpdate.technicalSkill = this.skillForm?.get('technicalSkill')?.value;
      this.skillToUpdate.softSkill = this.skillForm?.get('softSkill')?.value;
      this.skillToUpdate.toolsSkill = this.skillForm?.get('toolsSkill')?.value;
  
      if (this.skillToUpdate && this.skillToUpdate.id !== undefined) {
        this.skillService.updateSkill(this.skillToUpdate.id, this.skillToUpdate).subscribe({
          next: (updatedSkill: SkillModel) => {
            console.log('Updated Skill:', updatedSkill);
            this.dialogRef.close(true);
            this.snackBar.open('Cette compétence a été mise à jour avec succès', 'Fermer', { duration: 3000 });
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour de la compétence:', error);
          }
        });
      } else {
        console.error('La compétence ou son ID est indéfini.');
      }
    }


  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
