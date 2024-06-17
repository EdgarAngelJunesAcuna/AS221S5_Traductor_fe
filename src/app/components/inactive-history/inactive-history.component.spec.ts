import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveHistoryComponent } from './inactive-history.component';

describe('InactiveHistoryComponent', () => {
  let component: InactiveHistoryComponent;
  let fixture: ComponentFixture<InactiveHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InactiveHistoryComponent]
    });
    fixture = TestBed.createComponent(InactiveHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
