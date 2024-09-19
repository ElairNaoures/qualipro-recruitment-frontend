import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuizDialogComponent } from './update-quiz-dialog.component';

describe('UpdateQuizDialogComponent', () => {
  let component: UpdateQuizDialogComponent;
  let fixture: ComponentFixture<UpdateQuizDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateQuizDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateQuizDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
