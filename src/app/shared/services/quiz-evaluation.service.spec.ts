import { TestBed } from '@angular/core/testing';

import { QuizEvaluationService } from './quiz-evaluation.service';

describe('QuizEvaluationService', () => {
  let service: QuizEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizEvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
