import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinQuizComponent } from './fin-quiz.component';

describe('FinQuizComponent', () => {
  let component: FinQuizComponent;
  let fixture: ComponentFixture<FinQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
