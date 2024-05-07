import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModuleDialogComponent } from './delete-module-dialog.component';

describe('DeleteModuleDialogComponent', () => {
  let component: DeleteModuleDialogComponent;
  let fixture: ComponentFixture<DeleteModuleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteModuleDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteModuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
