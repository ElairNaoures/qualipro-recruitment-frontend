import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileJobDialogComponent } from './update-profile-job-dialog.component';

describe('UpdateProfileJobDialogComponent', () => {
  let component: UpdateProfileJobDialogComponent;
  let fixture: ComponentFixture<UpdateProfileJobDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateProfileJobDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProfileJobDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
