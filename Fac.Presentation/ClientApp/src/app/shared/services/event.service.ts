import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events = new Array<EventDictionary>();

  constructor() { }

  // this service is used to communicate events from component to component.  this main event instance is done in main.ts
  // then all the others just refeence the import but use the main instance.

  // Get event will create a new obseravalbe, store it into a list and return the Subject as an obseravalbe so the user can subscribe to it
  getEvent(eventName: string): Observable<any> {
    let eventDictionary = new EventDictionary();
    eventDictionary.eventName = eventName;
    eventDictionary.eventSource = new Subject<any>();
    this.events.push(eventDictionary);

    return eventDictionary.eventSource.asObservable();
  }
  // this method will send an event and message to any subscriber
  sendEvent(event: string, message: any) {
    let eventToTrigger = this.events.find((item: any) => item.eventName === event);

    if (eventToTrigger !== undefined) {
      eventToTrigger.eventSource.next(message);
    }
  }
  clearAllEvents() {
    this.events = [];
  }

  clearEvent(eventName: string) {
    let indexToDelete = this.events.findIndex((item) => item.eventName === eventName);

    if (indexToDelete !== -1) {
      this.events.splice(indexToDelete, 1);
    }
  }
}

// dictionary type object to hold the event and obseravalbe to be subscribed to
export class EventDictionary {
  eventName: string;
  eventSource: any;
}
