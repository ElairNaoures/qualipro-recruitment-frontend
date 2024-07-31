import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationPersoCondidatComponent } from './information-perso-condidat.component';

describe('InformationPersoCondidatComponent', () => {
  let component: InformationPersoCondidatComponent;
  let fixture: ComponentFixture<InformationPersoCondidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformationPersoCondidatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformationPersoCondidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
