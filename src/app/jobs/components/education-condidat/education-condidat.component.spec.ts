import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationCondidatComponent } from './education-condidat.component';

describe('EducationCondidatComponent', () => {
  let component: EducationCondidatComponent;
  let fixture: ComponentFixture<EducationCondidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationCondidatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EducationCondidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
