import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoQuizAvailableDialogComponent } from './no-quiz-available-dialog.component';

describe('NoQuizAvailableDialogComponent', () => {
  let component: NoQuizAvailableDialogComponent;
  let fixture: ComponentFixture<NoQuizAvailableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoQuizAvailableDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoQuizAvailableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
