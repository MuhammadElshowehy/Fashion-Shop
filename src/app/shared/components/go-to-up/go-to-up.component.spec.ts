import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToUpComponent } from './go-to-up.component';

describe('GoToUpComponent', () => {
  let component: GoToUpComponent;
  let fixture: ComponentFixture<GoToUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoToUpComponent]
    });
    fixture = TestBed.createComponent(GoToUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
