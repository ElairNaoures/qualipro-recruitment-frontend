import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJobsLienComponent } from './list-jobs-lien.component';

describe('ListJobsLienComponent', () => {
  let component: ListJobsLienComponent;
  let fixture: ComponentFixture<ListJobsLienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListJobsLienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListJobsLienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
