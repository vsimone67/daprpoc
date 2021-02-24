import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { GridBase } from '../GridBase';

@Component({
  selector: 'generic-grid',
  templateUrl: './generic-grid.component.html',
  styleUrls: ['./generic-grid.component.css']
})
export class GenericGridComponent extends GridBase
  implements OnInit, OnChanges {
  constructor() {
    super();
  }

  ngOnInit() { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    // if we want to change the default options we will pass it and then assign it to the component, call base class to do that
    super.ngOnChanges(changes);
  }
}
