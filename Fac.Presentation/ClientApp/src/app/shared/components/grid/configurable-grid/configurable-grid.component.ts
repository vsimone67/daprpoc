import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange,} from "@angular/core";
import {ColDef, GridApi, GridOptions} from "ag-grid-community";

@Component({
  selector: "configurable-grid",
  templateUrl: "./configurable-grid.component.html",
  styleUrls: ["./configurable-grid.component.css"],
})
export class ConfigurableGridComponent implements OnInit, OnChanges {
  @Input() options: GridOptions;
  @Input() defaultcols: Array<String>;
  @Input() ColumnDefs: Array<ColDef>;
  @Input() RowData: Array<any>;
  @Input() GridStyle: any;
  @Input() RowClassRules: any;
  @Input() loading: boolean;
  @Input() tableName: string;
  @Input() buttonText: string;
  @Input() showHideButton: boolean;

  @Output() disableVisible: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  appliedRowData: Array<any>
  visible: boolean = false;
  colsShown: any[];
  listeCols: Array<any>;
  appliedCols: Array<ColDef>
  gridApi: GridApi;
  currentGridOptons: GridOptions;

  constructor() {
    this.defaultGridOptions();
    this.defaultGridWidthandHeight();
    this.RowClassRules = {};
    this.showHideButton = true;
    this.loading = false;
  }

  updateCols() {
    this.appliedCols = this.ColumnDefs.filter(col => this.colsShown.includes(col.field));
    localStorage.setItem(this.tableName, this.colsShown.toString());
    this.updateRowData()
  }

  ngOnInit() {

    let table = localStorage.getItem(this.tableName);
    if (table) {
      this.colsShown = table.split(',')
      this.appliedCols = [];
      this.colsShown.forEach(col => {
        this.appliedCols.push(this.ColumnDefs.filter(column => col === column.field)[0])
      })
    } else {
      this.colsShown = this.defaultcols;
      this.appliedCols = [];
      this.colsShown.forEach(col => {
        this.appliedCols.push(this.ColumnDefs.filter(column => col === column.field)[0])
      })
    }
    if (this.ColumnDefs) {
      this.listeCols = [];
      this.ColumnDefs.forEach(col => {
        this.listeCols.push({label: col.headerName, value: col.field})
      })
    }
    if (this.RowData) {
      this.updateRowData()
    }

  }

  updateRowData() {
    let tableValues = [];
    let newElement: string;
    this.appliedRowData = [];
    this.RowData.forEach(element => {
      newElement = ""
      this.colsShown.forEach(key => {
        if (element[key]) newElement = newElement.concat(element[key])
      })

      if (tableValues.length === 0 || !tableValues.includes(newElement)) {
        this.appliedRowData.push(element)
      }
      if (!tableValues.includes(newElement)) tableValues.push(newElement)
    })
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit(); // size grid to take up all availibe realestate
    this.gridApi = params.api;
    this.visible = true
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    // if we want to change the default options we will pass it and then assign it to the component

    // if options are passed, override default
    if (changes.options != undefined) {
      this.currentGridOptons = changes.options.currentValue;
    }

    // if style is passed, override default
    if (changes.GridStyle != undefined) {
      this.GridStyle = changes.GridStyle.currentValue;
    }

    if (changes.RowClassRules != undefined) {
      this.RowClassRules = changes.RowClassRules.currentValue;
    }
  }

  defaultGridOptions() {
    this.currentGridOptons = {
      defaultColDef: {
        sortable: true,
        resizable: true,
        width: 150
      },
      pagination: false,
      paginationAutoPageSize: true,
    };
  }

  defaultGridWidthandHeight() {
    this.GridStyle = {
      width: "100%",
      height: "250px",
    };
  }

  public refresh() {
    this.gridApi.redrawRows();
  }

  updateVisible(data) {
    this.visible = data
    if (!data) {
      this.disableVisible.emit(false)
    }
  }

  changeCols(event) {
    let cols: any[] = event.columnApi.getAllGridColumns();
    this.colsShown = []
    for (let col of cols) {
      var colDef = col.getColDef();
      if (colDef.field && colDef.field !== '')
        this.colsShown.push(colDef.field)
    }
    this.updateRowData()

    localStorage.setItem(this.tableName, this.colsShown.toString());
    if (this.gridApi !== undefined) {
      this.gridApi.sizeColumnsToFit();
    }
  }
}
