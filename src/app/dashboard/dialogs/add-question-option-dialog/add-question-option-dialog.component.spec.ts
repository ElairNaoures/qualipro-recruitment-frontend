import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionOptionDialogComponent } from './add-question-option-dialog.component';

describe('AddQuestionOptionDialogComponent', () => {
  let component: AddQuestionOptionDialogComponent;
  let fixture: ComponentFixture<AddQuestionOptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddQuestionOptionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddQuestionOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
