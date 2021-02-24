import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { ToastComponent } from "./components/toast/toast.component";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppSettingsService } from "@shared/services/app-settings.service";
import { HttpService } from "@shared/services/http-service.service";
import { EventService } from "@shared/services/event.service";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { ListboxModule } from "primeng/listbox";
import { DragDropModule } from "primeng/dragdrop";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputSwitchModule } from "primeng/inputswitch";
import { TabViewModule } from "primeng/tabview";
import { TableModule } from "primeng/table";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { AgGridModule } from "ag-grid-angular";
import { CalendarModule } from "primeng/calendar";
import { InputTextareaModule } from "primeng/inputtextarea";
import { FileUploadModule } from "primeng/fileupload";
import {
  ButtonCellComponent,
  ImageButtonCellComponent,
} from "./components/grid";
import { CardModule } from "primeng/card";
import { SliderModule } from "primeng/slider";
import { ToggleButtonModule } from "primeng/togglebutton";
import { PaginatorModule } from "primeng/paginator";
import { NgxGraphModule } from "@swimlane/ngx-graph";
import { MultiSelectModule } from "primeng";
import { GenericGridComponent } from "./components/grid/generic-grid/generic-grid.component";
import { LinkCellComponent } from "./components/grid/link-cell/link-cell.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { MenubarModule } from "primeng/menubar";
import { ConfigurableGridComponent } from "./components/grid/configurable-grid/configurable-grid.component";
import { TooltipModule } from "primeng/tooltip";
import { AccordionModule } from "primeng/accordion";
import { SignalrHubService } from "./services/signalr-hub.service";

@NgModule({
  declarations: [
    BreadcrumbComponent,
    ToastComponent,
    ButtonCellComponent,
    ImageButtonCellComponent,
    ConfigurableGridComponent,
    GenericGridComponent,
    LinkCellComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BreadcrumbModule,
    MenuModule,
    ButtonModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule,
    InputTextModule,
    CheckboxModule,
    ListboxModule,
    DragDropModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule,
    InputSwitchModule,
    TabViewModule,
    TableModule,
    ProgressSpinnerModule,
    CalendarModule,
    InputTextareaModule,
    FileUploadModule,
    ReactiveFormsModule,
    PaginatorModule,
    NgxGraphModule,
    AgGridModule.withComponents([
      ButtonCellComponent,
      ImageButtonCellComponent,
      LinkCellComponent,
    ]),
    CardModule,
    SliderModule,
    ToggleButtonModule,
    MultiSelectModule,
    MenubarModule,
    TooltipModule,
    AccordionModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BreadcrumbComponent,
    MenuModule,
    ButtonModule,
    ToastComponent,
    ToastModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule,
    InputTextModule,
    CheckboxModule,
    ListboxModule,
    DragDropModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule,
    InputSwitchModule,
    TabViewModule,
    TableModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    PaginatorModule,
    NgxGraphModule,
    ConfigurableGridComponent,
    CardModule,
    SliderModule,
    ToggleButtonModule,
    GenericGridComponent,
    LoadingComponent,
    MenubarModule,
    TooltipModule,
    CalendarModule,
    AccordionModule,
  ],
  providers: [
    MessageService,
    AppSettingsService,
    HttpService,
    EventService,
    ConfirmationService,
    SignalrHubService,
  ],
})
export class SharedModule {}
