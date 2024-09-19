import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSkillDialogComponent } from './update-skill-dialog.component';

describe('UpdateSkillDialogComponent', () => {
  let component: UpdateSkillDialogComponent;
  let fixture: ComponentFixture<UpdateSkillDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSkillDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSkillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
