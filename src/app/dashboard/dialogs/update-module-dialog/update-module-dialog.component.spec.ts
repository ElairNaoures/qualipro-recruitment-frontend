import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModuleDialogComponent } from './update-module-dialog.component';

describe('UpdateModuleDialogComponent', () => {
  let component: UpdateModuleDialogComponent;
  let fixture: ComponentFixture<UpdateModuleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateModuleDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateModuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
