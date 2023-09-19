import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-or-favorite-empty',
  templateUrl: './cart-or-favorite-empty.component.html',
  styleUrls: ['./cart-or-favorite-empty.component.css']
})
export class CartOrFavoriteEmptyComponent {
  @Input() titlePage: string;
}
