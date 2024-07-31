import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceProfCondidatComponent } from './experience-prof-condidat.component';

describe('ExperienceProfCondidatComponent', () => {
  let component: ExperienceProfCondidatComponent;
  let fixture: ComponentFixture<ExperienceProfCondidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExperienceProfCondidatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperienceProfCondidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
