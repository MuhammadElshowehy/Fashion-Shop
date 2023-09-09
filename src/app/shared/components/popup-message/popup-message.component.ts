import { Component, Input, OnChanges, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.css'],
})
export class popupMessageComponent implements OnChanges {
  @Input() popupMessage: string;
  @Output() closePopupMessage = new Subject<string>();

  ngOnChanges() {
    if (this.popupMessage) {
      setTimeout(() => {
        this.close();
      }, 3000);
    }
  }

  close() {
    this.popupMessage = '';
    this.closePopupMessage.next(this.popupMessage);
  }
}
