import { Component } from "@angular/core";
import { AgRendererComponent } from "ag-grid-angular";
@Component({
  selector: "app-image-button-cell",
  templateUrl: "./image-button-cell.component.html",
  styleUrls: ["./image-button-cell.component.css"],
})
export class ImageButtonCellComponent implements AgRendererComponent {
  private cell: any;
  private params: any;
  public icon: string;
  public isVisible: boolean;

  constructor() {
    this.isVisible = true;
  }
  agInit(params: any): void {
    this.cell = params.data;
    this.params = params;
    this.icon = this.params.icon;
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
