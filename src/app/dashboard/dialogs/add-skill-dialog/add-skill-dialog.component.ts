import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SkillService } from '../../../shared/services/skill.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SkillModel } from '../../../shared/models/skill-model';

@Component({
  selector: 'app-add-skill-dialog',
  templateUrl: './add-skill-dialog.component.html',
  styleUrl: './add-skill-dialog.component.scss'
})
export class AddSkillDialogComponent implements OnInit {

  myForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddSkillDialogComponent>,
    private skillService: SkillService,
    private snackBar: MatSnackBar 
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {  
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      skillType: new FormControl('', Validators.required)  // Ajouté pour le type de compétence
    });
  }

  addSkill() {
    const selectedSkillType = this.myForm.get('skillType')?.value;

    const skill_data: SkillModel = {
      name: this.myForm.get('name')?.value,
      technicalSkill: selectedSkillType === 'technical',
      softSkill: selectedSkillType === 'soft',
      toolsSkill: selectedSkillType === 'tools'
    };

    this.skillService.addSkill(skill_data).subscribe({
      next: res => {
        this.snackBar.open("Compétence ajoutée avec succès", "OK", { duration: 3000 });
        this.dialogRef.close({ data: "success" });
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close(false); 
  }
}
