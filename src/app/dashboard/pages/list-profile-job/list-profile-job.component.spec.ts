import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfileJobComponent } from './list-profile-job.component';

describe('ListProfileJobComponent', () => {
  let component: ListProfileJobComponent;
  let fixture: ComponentFixture<ListProfileJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListProfileJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProfileJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
