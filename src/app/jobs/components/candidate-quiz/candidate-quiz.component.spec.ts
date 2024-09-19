import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateQuizComponent } from './candidate-quiz.component';

describe('CandidateQuizComponent', () => {
  let component: CandidateQuizComponent;
  let fixture: ComponentFixture<CandidateQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidateQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
