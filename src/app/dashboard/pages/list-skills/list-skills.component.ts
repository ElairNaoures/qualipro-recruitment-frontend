import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SkillService } from '../../../shared/services/skill.service';
import { MatDialog } from '@angular/material/dialog';
import { SkillModel } from '../../../shared/models/skill-model';
import { DeleteSkillDialogComponent } from '../../dialogs/delete-skill-dialog/delete-skill-dialog.component';
import { UpdateSkillDialogComponent } from '../../dialogs/update-skill-dialog/update-skill-dialog.component';
import { AddSkillDialogComponent } from '../../dialogs/add-skill-dialog/add-skill-dialog.component';





export interface SkillData {
  id: number ; 
  name?: string;
  technicalSkill?: Boolean ;
  softSkill?: Boolean ;
  toolsSkill?: Boolean ;   
}
@Component({
  selector: 'app-list-skills',
  templateUrl: './list-skills.component.html',
  styleUrl: './list-skills.component.scss'
})
export class ListSkillsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','technicalSkill','softSkill','toolsSkill', 'actions'];
  dataSource: MatTableDataSource<SkillData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private skillService: SkillService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<SkillData>([]);
  }

  ngOnInit(): void {
    this.getAllSkills();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllSkills() {
    this.skillService.getAllSkills().subscribe({
      next: (res: SkillModel[]) => {
        const skillData: SkillData[] = res.map(skill => ({
          id: skill.id || 0,
          name: skill.name || '',
          technicalSkill: skill.technicalSkill ?? false, // Ensure Boolean type
          softSkill: skill.softSkill ?? false,           // Ensure Boolean type
          toolsSkill: skill.toolsSkill ?? false,  
        }));
        this.dataSource.data = skillData;
      },
      error: err => {
        console.log('Error:', err);
      },
    });
  }

  // openDeleteSkill(skillId: number) {
  //   this.dialog.open(DeleteSkillDialogComponent, {
  //     data: { skillId: skillId },
  //   });
    
  // }

  openDeleteSkill(skillId: number): void {
    const dialogRef = this.dialog.open(DeleteSkillDialogComponent, {
      width: '500px',
      data: { skillId: skillId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh the data if a skill was deleted
        this.getAllSkills();
      }
    });
  }

  openUpdateSkill(skill: SkillData) {
    if (skill && skill.id !== undefined) {
      const dialog = this.dialog.open(UpdateSkillDialogComponent, {
        data: skill,
        width: '900px',
      });
  
      dialog.afterClosed().subscribe((res) => {  
        if (res) {
          this.getAllSkills();
        }
      });
    } else {
      console.error("ce competence ou son ID est indéfini.");
    }
  }

  openAddSkill(){

    let dialogRef =  this.dialog.open(AddSkillDialogComponent, {
      width: '900px',
    });
      this.visible = true;
      dialogRef.afterClosed().subscribe((res) => {

        if (res.data == "success") {
this.getAllSkills();
        }
      });
  }
  visible: boolean = false;
}