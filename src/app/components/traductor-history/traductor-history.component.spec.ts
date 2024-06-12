import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraductorHistoryComponent } from './traductor-history.component';

describe('TraductorHistoryComponent', () => {
  let component: TraductorHistoryComponent;
  let fixture: ComponentFixture<TraductorHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraductorHistoryComponent]
    });
    fixture = TestBed.createComponent(TraductorHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
