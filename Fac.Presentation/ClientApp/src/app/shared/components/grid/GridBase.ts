import { Input, SimpleChange } from "@angular/core";
import { ColDef, GridOptions, GridApi } from "ag-grid-community";
import { GridStyleModel } from './gridStyleModel';

export class GridBase {
  @Input() options: GridOptions;
  @Input() ColumnDefs: Array<ColDef>;
  @Input() RowData: Array<any>;
  @Input() Width: string;
  @Input() Height: string;
  @Input() GridCssClass: string;
  @Input() GridCssStyle: string;

  gridContainerStyle: GridStyleModel;
  gridApi: GridApi;
  currentGridOptons: GridOptions;

  constructor() {
    this.defaultGridOptions();
    this.defaultGridWidthandHeight();
    this.GridCssClass = "ag-theme-alpine";
    this.GridCssStyle = "width: 100%; height: 250px;";
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit(); // size grid to take up all availibe realestate
    this.gridApi = params.api;
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    // if we want to change the default options we will pass it and then assign it to the component

    // if options are passed, override default
    if (changes.options != undefined) {
      this.currentGridOptons = changes.options.currentValue;
    }

    if (changes.Height !== undefined) {
      this.gridContainerStyle.height = changes.Height.currentValue;
    }

    if (changes.Width !== undefined) {
      this.gridContainerStyle.width = changes.Width.currentValue;
    }

    if (changes.GridCssClass !== undefined) {
      this.GridCssClass = changes.GridCssClass.currentValue;
    }

    if (changes.GridCssStyle !== undefined) {
      this.GridCssStyle = changes.GridCssStyle.currentValue;
    }
  }

  defaultGridOptions() {
    this.currentGridOptons = {
      defaultColDef: {
        sortable: true,
        resizable: true,
      },
      pagination: false,
      paginationAutoPageSize: true

    };
  }

  defaultGridWidthandHeight() {
    this.gridContainerStyle = {
      width: "100%",
      height: "250px",
    };
  }
}
