import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ContractTypeService } from '../../../shared/services/contract-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContractTypeModel } from '../../../shared/models/ContractType.model';

@Component({
  selector: 'app-add-contact-type-dialog',
  templateUrl: './add-contact-type-dialog.component.html',
  styleUrl: './add-contact-type-dialog.component.scss'
})
export class AddContactTypeDialogComponent {

  myForm!: FormGroup;
  visible: boolean = false;
  

  constructor(
    private dialogRef: MatDialogRef<AddContactTypeDialogComponent>,
    private contractTypeService: ContractTypeService,
    private snackBar: MatSnackBar 
  ) {}
  ngOnInit(): void {
    this.visible  = false; 
    this.initForm();
  }

  addContractType(){
    console.log(this.myForm.value); 

    
    let contractType_data : ContractTypeModel={
      designation:this.myForm.get("designation")?.value,


    }
    

    this.contractTypeService.addContractType(contractType_data).subscribe({
      next: res=> {
        this.snackBar.open("Contrat ajoutee avec succees ",  "ok", {duration: 3000});
        this.dialogRef.close({data:"success"});
      }
    })
  }
 
  initForm() {  
    this.myForm = new FormGroup({
      designation: new FormControl('', Validators.required)
     
    });
  }

  closeDialog(): void {
    this.dialogRef.close(false); // Fermer le dialogue sans ajouter de job
  }
}
