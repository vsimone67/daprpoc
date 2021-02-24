import { Component, OnInit } from "@angular/core";
import { AgRendererComponent } from "ag-grid-angular";

@Component({
  templateUrl: "./button-cell.component.html",
  styleUrls: ["./button-cell.component.css"],
})
export class ButtonCellComponent implements AgRendererComponent {
  private cell: any;
  private params: any;
  public buttonText: string;

  agInit(params: any): void {
    this.cell = params.data;
    this.params = params;
    this.buttonText = this.params.buttonText;
  }

  refresh(params: any): boolean {
    return true;
  }

  buttonClicked($event) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };
      this.params.onClick(params);
    }
  }
}
