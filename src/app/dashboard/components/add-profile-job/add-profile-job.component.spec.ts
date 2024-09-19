import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfileJobComponent } from './add-profile-job.component';

describe('AddProfileJobComponent', () => {
  let component: AddProfileJobComponent;
  let fixture: ComponentFixture<AddProfileJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProfileJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProfileJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
