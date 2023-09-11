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
  isAlert: boolean;

  ngOnChanges() {
    if (this.popupMessage) {
      let lastChar: string = this.popupMessage.substring(
        this.popupMessage.length - 1
      );
      if (lastChar === '!') {
        this.isAlert = true;
      } else {
        this.isAlert = false;
      }
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
