import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-products-filters',
  templateUrl: './products-filters.component.html',
  styleUrls: ['./products-filters.component.css']
})
export class ProductsFiltersComponent  {
  @Input() categories: string[] = [];
  @Output() selectedFilter = new Subject<Event>();

  SendSelectedFilter(event: Event){
    this.selectedFilter.next(event);
  }
}
