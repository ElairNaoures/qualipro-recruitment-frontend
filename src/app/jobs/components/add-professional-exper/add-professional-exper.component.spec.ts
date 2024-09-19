import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfessionalExperComponent } from './add-professional-exper.component';

describe('AddProfessionalExperComponent', () => {
  let component: AddProfessionalExperComponent;
  let fixture: ComponentFixture<AddProfessionalExperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProfessionalExperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProfessionalExperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
