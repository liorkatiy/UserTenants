import { Injectable, EventEmitter, Output } from '@angular/core';

//handle login event when user login to alert other components
@Injectable({
  providedIn: 'root'
})
export class LoginEventService {

  @Output() fire: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  logged(logged: boolean) {
    this.fire.emit(logged);
  }

  getEmittedValue() {
    return this.fire;
  }
}
