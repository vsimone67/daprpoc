import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '@shared/services/event.service';
import { events } from '@constants/events.model';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input() show: boolean;

  constructor(private _eventService: EventService) {
    _eventService.getEvent(events.loadingEvent).subscribe(
      spinnerState => {
        this.show = spinnerState;
      });
  }

  ngOnInit(): void {
  }

}
