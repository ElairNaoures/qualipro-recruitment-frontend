import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizEvaluationComponent } from './quiz-evaluation.component';

describe('QuizEvaluationComponent', () => {
  let component: QuizEvaluationComponent;
  let fixture: ComponentFixture<QuizEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizEvaluationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
