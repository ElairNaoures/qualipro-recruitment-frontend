import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationPersoUserComponent } from './information-perso-user.component';

describe('InformationPersoUserComponent', () => {
  let component: InformationPersoUserComponent;
  let fixture: ComponentFixture<InformationPersoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformationPersoUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformationPersoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
