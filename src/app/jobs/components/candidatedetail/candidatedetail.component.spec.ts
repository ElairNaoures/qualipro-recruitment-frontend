import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatedetailComponent } from './candidatedetail.component';

describe('CandidatedetailComponent', () => {
  let component: CandidatedetailComponent;
  let fixture: ComponentFixture<CandidatedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidatedetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidatedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
