import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginEventService {

  @Output() fire: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  logged() {
    this.fire.emit(true);
  }

  getEmittedValue() {
    return this.fire;
  }
}
