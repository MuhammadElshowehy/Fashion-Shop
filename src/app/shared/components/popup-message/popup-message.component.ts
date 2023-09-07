import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.css']
})
export class popupMessageComponent {
  @Input() popupMessage: string;
  @Output() closePopupMessage = new Subject<string>();

  close(){
    this.popupMessage = '';
    this.closePopupMessage.next(this.popupMessage);
  }
}


