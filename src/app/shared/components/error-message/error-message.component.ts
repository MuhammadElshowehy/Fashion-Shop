import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {
  @Input() errorMessage: string;
  @Output() closeError = new Subject<string>();

  close(){
    this.errorMessage = '';
    this.closeError.next(this.errorMessage);
  }
}


