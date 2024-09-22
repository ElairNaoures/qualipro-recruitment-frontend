import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationjobComponent } from './informationjob.component';

describe('InformationjobComponent', () => {
  let component: InformationjobComponent;
  let fixture: ComponentFixture<InformationjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformationjobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformationjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
