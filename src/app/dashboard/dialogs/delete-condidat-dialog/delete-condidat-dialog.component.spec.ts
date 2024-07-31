import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCondidatDialogComponent } from './delete-condidat-dialog.component';

describe('DeleteCondidatDialogComponent', () => {
  let component: DeleteCondidatDialogComponent;
  let fixture: ComponentFixture<DeleteCondidatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCondidatDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteCondidatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
