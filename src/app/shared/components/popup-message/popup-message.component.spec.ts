import { ComponentFixture, TestBed } from '@angular/core/testing';

import { popupMessageComponent } from './popup-message.component';

describe('ErrorMessageComponent', () => {
  let component: popupMessageComponent;
  let fixture: ComponentFixture<popupMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [popupMessageComponent]
    });
    fixture = TestBed.createComponent(popupMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
