import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContractTypesComponent } from './list-contract-types.component';

describe('ListContractTypesComponent', () => {
  let component: ListContractTypesComponent;
  let fixture: ComponentFixture<ListContractTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListContractTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListContractTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
