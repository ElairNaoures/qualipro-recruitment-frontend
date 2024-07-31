import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCondidatPageComponent } from './profile-condidat-page.component';

describe('ProfileCondidatPageComponent', () => {
  let component: ProfileCondidatPageComponent;
  let fixture: ComponentFixture<ProfileCondidatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileCondidatPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileCondidatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
