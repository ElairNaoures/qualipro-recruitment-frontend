import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactTypeDialogComponent } from './add-contact-type-dialog.component';

describe('AddContactTypeDialogComponent', () => {
  let component: AddContactTypeDialogComponent;
  let fixture: ComponentFixture<AddContactTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddContactTypeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddContactTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
