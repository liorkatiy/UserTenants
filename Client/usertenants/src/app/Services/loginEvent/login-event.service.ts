import { Injectable, EventEmitter, Output } from '@angular/core';

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
