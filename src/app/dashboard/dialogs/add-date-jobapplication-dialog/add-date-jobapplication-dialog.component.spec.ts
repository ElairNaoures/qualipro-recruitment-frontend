import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDateJobapplicationDialogComponent } from './add-date-jobapplication-dialog.component';

describe('AddDateJobapplicationDialogComponent', () => {
  let component: AddDateJobapplicationDialogComponent;
  let fixture: ComponentFixture<AddDateJobapplicationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDateJobapplicationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDateJobapplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
