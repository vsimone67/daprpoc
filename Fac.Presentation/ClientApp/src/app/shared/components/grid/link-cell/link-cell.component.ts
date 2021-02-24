import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
  selector: 'link-cell',
  templateUrl: './link-cell.component.html',
  styleUrls: ['./link-cell.component.css']
})
export class LinkCellComponent implements AgRendererComponent {
  private cell: any;
  public params: any;
  public isVisible: boolean;
  public cellData: any;

  constructor() {
    this.isVisible = true;
  }
  agInit(params: any): void {
    this.cell = params.data;
    this.params = params;
    this.cellData = this.cell[params.colDef.field];

  }

  refresh(params: any): boolean {
    return true;
  }

  buttonClicked($event) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
        field: this.params.colDef.field
      };
      this.params.onClick(params);
    }
  }
}
