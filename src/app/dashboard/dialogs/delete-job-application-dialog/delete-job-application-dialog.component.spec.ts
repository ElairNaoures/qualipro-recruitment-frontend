import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteJobApplicationDialogComponent } from './delete-job-application-dialog.component';

describe('DeleteJobApplicationDialogComponent', () => {
  let component: DeleteJobApplicationDialogComponent;
  let fixture: ComponentFixture<DeleteJobApplicationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteJobApplicationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteJobApplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
