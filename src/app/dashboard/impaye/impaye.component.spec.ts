import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpayeComponent } from './impaye.component';

describe('ImpayeComponent', () => {
  let component: ImpayeComponent;
  let fixture: ComponentFixture<ImpayeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImpayeComponent]
    });
    fixture = TestBed.createComponent(ImpayeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
