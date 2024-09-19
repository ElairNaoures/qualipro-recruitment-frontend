import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuizEvaluationComponent } from './list-quiz-evaluation.component';

describe('ListQuizEvaluationComponent', () => {
  let component: ListQuizEvaluationComponent;
  let fixture: ComponentFixture<ListQuizEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListQuizEvaluationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListQuizEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
