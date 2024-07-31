import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteContactTypeDialogComponent } from './delete-contact-type-dialog.component';

describe('DeleteContactTypeDialogComponent', () => {
  let component: DeleteContactTypeDialogComponent;
  let fixture: ComponentFixture<DeleteContactTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteContactTypeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteContactTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
