import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JobService } from '../../../shared/services/job.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobModel } from '../../../shared/models/job.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { languages } from '../../../shared/Data/Languages';
import { ContractTypeService } from '../../../shared/services/contract-type.service';
import { ContractTypeModel } from '../../../shared/models/ContractType.model';
import { ContractTypeData } from '../../pages/list-contract-types/list-contract-types.component';
import { UserData } from '../../pages/list-users/list-users.component';
import { UserModel } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';
import { ProfileJobModel } from '../../../shared/models/profile-job-model';
import { ProfileJobService } from '../../../shared/services/profile-job.service';

@Component({
  selector: 'app-add-job-dialog',
  templateUrl: './add-job-dialog.component.html',
  styleUrl: './add-job-dialog.component.scss'
})
export class AddJobDialogComponent {
  myForm!: FormGroup;
  visible: boolean = false;

  listLanguages =  languages;
  contractTypeData: ContractTypeData[] = [];
  userData: UserData[] = [];
  profileJobData: ProfileJobModel[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddJobDialogComponent>,
    private jobService: JobService,
    private snackBar: MatSnackBar ,
    private contractTypeService: ContractTypeService,
    private userService: UserService,
    private profileJobService: ProfileJobService
  ) {}
  ngOnInit(): void {
    this.getAllProfileJobs();
    this.getAllUsers();
    this.getAllContractTypes();
    this.visible  = false; 
    this.initForm();
  }

  addJob() {
    console.log(this.myForm.value);
  
    let languagesValue: string[] = this.myForm.get("languages")?.value || [];
    let languagesValueStr = "";
    if (languagesValue.length > 0) {
      languagesValueStr = languagesValue.join(",");
    }
    let job_data: JobModel = {
      title: this.myForm.get("title")?.value,
      description: this.myForm.get("description")?.value,
      yearsOfExperience: this.myForm.get("yearsOfExperience")?.value,
      languages: languagesValueStr,
      educationLevel: this.myForm.get("educationLevel")?.value,
      expirationDate: this.myForm.get("expirationDate")?.value,
      contractTypeId: this.myForm.get("contractTypeId")?.value,
      userId: this.myForm.get("userId")?.value,
      jobProfileId: this.myForm.get("jobProfileId")?.value,
    };
    console.log("after join", job_data);
  
    this.jobService.addJob(job_data).subscribe({
      next: res => {
        this.snackBar.open("Job ajoutee avec succees ", "ok", { duration: 3000 });
        this.dialogRef.close({ data: "success" });
      }
    });
  }

  // addJob(){
  //   console.log(this.myForm.value); 

  //   let languagesValue:string [] = this.myForm.get("languages")?.value || [];
  //   let languagesValueStr =""
  //   if (languagesValue.length > 0) {

  //     languagesValueStr = languagesValue.join(",");
  //   }
  //   let job_data : JobModel={
  //   title:this.myForm.get("title")?.value,
  //   description:this.myForm.get("description")?.value,
  //   yearsOfExperience:this.myForm.get("yearsOfExperience")?.value,
  //   languages:languagesValueStr,
  //   educationLevel:this.myForm.get("educationLevel")?.value,
  //   expirationDate:this.myForm.get("expirationDate")?.value,
  //   contractTypeId: this.myForm.get("contractTypeId")?.value,

  //   userId: this.myForm.get("userId")?.value,
  //   jobProfileId: this.myForm.get("jobProfileId")?.value,
    
  //   }
  //   console.log("after join",job_data); 

  //   this.jobService.addJob(job_data).subscribe({
  //     next: res=> {
  //       this.snackBar.open("Job ajoutee avec succees ",  "ok", {duration: 3000});
  //       this.dialogRef.close({data:"success"});
  //     }
  //   })
  // }
 
  

  initForm() {  
    this.myForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      yearsOfExperience: new FormControl('', Validators.required),
      languages: new FormControl('', Validators.required),
      educationLevel: new FormControl('', Validators.required),
      expirationDate: new FormControl('', Validators.required),
      contractTypeId: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
      jobProfileId: new FormControl('', Validators.required),


    });
  }

  closeDialog(): void {
    this.dialogRef.close(false); 
  }

  getAllContractTypes() {
    this.contractTypeService.getAllContractTypes().subscribe({
      next: (res: ContractTypeModel[]) => {
        this.contractTypeData = res.map(contractType => ({
          id: contractType.id || 0,
          designation: contractType.designation || '',
          createdAt: contractType.createdAt ? new Date(contractType.createdAt) : null, // Assurez-vous de convertir en Date

          
        }));
      },
      error: err => {
        console.log('Error:', err);
      },
    });
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res: UserModel[]) => {
        this.userData = res.map(user => ({
          id: user.id || 0,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          country: user.country || '',
          phoneNumber: user.phoneNumber || '',
          birthdate: user.birthdate || '',
          roleName: user.roleName || '',

          
          
        }));
      },
      error: err => {
        console.log('Error:', err);
      },
    });
  }

  getAllProfileJobs() {
    this.profileJobService.getAllProfileJobs().subscribe({
      next: (res: ProfileJobModel[]) => {
        this.profileJobData = res.map(profileJob => ({
          id: profileJob.id || 0,
          profileName: profileJob.profileName || '',
    

          
          
        }));
      },
      error: err => {
        console.log('Error:', err);
      },
    });
  }
}