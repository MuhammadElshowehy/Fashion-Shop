import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOrFavoriteEmptyComponent } from './cart-or-favorite-empty.component';

describe('CartOrFavoriteEmptyComponent', () => {
  let component: CartOrFavoriteEmptyComponent;
  let fixture: ComponentFixture<CartOrFavoriteEmptyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartOrFavoriteEmptyComponent]
    });
    fixture = TestBed.createComponent(CartOrFavoriteEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
