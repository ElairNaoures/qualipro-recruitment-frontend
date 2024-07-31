import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJobDialogComponent } from './update-job-dialog.component';

describe('UpdateJobDialogComponent', () => {
  let component: UpdateJobDialogComponent;
  let fixture: ComponentFixture<UpdateJobDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateJobDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateJobDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
