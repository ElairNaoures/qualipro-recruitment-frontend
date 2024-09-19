import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseCondidatComponent } from './reponse-condidat.component';

describe('ReponseCondidatComponent', () => {
  let component: ReponseCondidatComponent;
  let fixture: ComponentFixture<ReponseCondidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReponseCondidatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReponseCondidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
