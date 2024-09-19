import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondidatMoyenChartComponent } from './condidat-moyen-chart.component';

describe('CondidatMoyenChartComponent', () => {
  let component: CondidatMoyenChartComponent;
  let fixture: ComponentFixture<CondidatMoyenChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CondidatMoyenChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CondidatMoyenChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
