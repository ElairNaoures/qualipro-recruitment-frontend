import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfileJobDialogComponent } from './delete-profile-job-dialog.component';

describe('DeleteProfileJobDialogComponent', () => {
  let component: DeleteProfileJobDialogComponent;
  let fixture: ComponentFixture<DeleteProfileJobDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteProfileJobDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteProfileJobDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
