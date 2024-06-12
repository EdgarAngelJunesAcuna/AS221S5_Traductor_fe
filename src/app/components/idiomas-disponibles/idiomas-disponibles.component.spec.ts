import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdiomasDisponiblesComponent } from './idiomas-disponibles.component';

describe('IdiomasDisponiblesComponent', () => {
  let component: IdiomasDisponiblesComponent;
  let fixture: ComponentFixture<IdiomasDisponiblesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdiomasDisponiblesComponent]
    });
    fixture = TestBed.createComponent(IdiomasDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
