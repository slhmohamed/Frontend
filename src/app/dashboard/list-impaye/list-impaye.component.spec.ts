import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImpayeComponent } from './list-impaye.component';

describe('ListImpayeComponent', () => {
  let component: ListImpayeComponent;
  let fixture: ComponentFixture<ListImpayeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListImpayeComponent]
    });
    fixture = TestBed.createComponent(ListImpayeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
