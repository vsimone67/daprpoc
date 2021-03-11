import { Component, OnInit } from "@angular/core";
import { environment } from "@environment/environment";
import { HttpService } from "@shared/services/http-service.service";
import { SignalrHubService } from "@shared/services/signalr-hub.service";
import { MessageService } from "primeng";
import { FacCase } from "./FacCase";
import { MibSubmitted } from "./MibSubmitted";
import { NaarSplitGenerateInfo } from "./NaarSplitGenerateInfo";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  // if you need multiple connections then you have to create the service with new and not inject
  private _mibConnection: SignalrHubService;
  private _facDecisionConnection: SignalrHubService;
  private _facCaseConnection: SignalrHubService;
  private _retroConnection: SignalrHubService;

  private _connectionId:string;

  constructor( private messageService: MessageService, private _httpService: HttpService) {
    // cant inject SignalrHubSerivce if you have multiple listeners becuase the service is a singleton
    this._mibConnection = new SignalrHubService();
    this._facDecisionConnection = new SignalrHubService();
    this._facCaseConnection = new SignalrHubService();
    this._retroConnection = new SignalrHubService();
  }

  async ngOnInit() {
    await this.CreateMibConnection();
    // await this.CreateFacDecisionConnection();
    // await this.CreateFacSumbittedConnection();
    // await this.CreateRetroConnection();
  }

  async CreateMibConnection() {
    this._mibConnection.URL = `${environment.apiGatewayUrl}/mibhub`
    //this._mibConnection.URL = `http://localhost:5202/mibhub`

    await this._mibConnection.Connect();

    if (this._mibConnection.IsConnected) {
      this.RegisterMibEvents();

    }
  }

  protected RegisterMibEvents(): void {
    this._mibConnection.Hub.on("MibCompleted", (data: any) => {
      console.log(data);
      const received = `MIB Completed, WHEW!`;
      this.messageService.add({
        severity: "info",
        detail: received,
        life: 3000,
      });
    });
  }

  async CreateFacDecisionConnection() {
     this._facDecisionConnection.URL = `${environment.apiGatewayUrl}/facdecision`
    await this._facDecisionConnection.Connect();

    if (this._facDecisionConnection.IsConnected) {
      this.RegisterFacDecisionEvents();
    }
  }

  protected RegisterFacDecisionEvents(): void {
    this._facDecisionConnection.Hub.on("FacDecisionMade", (data: any) => {
      console.log(data);
      const received = `Fac Decision Made`;
      this.messageService.add({
        severity: "info",
        detail: received,
        life: 3000,
      });
    });
  }

  async CreateFacSumbittedConnection() {
    this._facCaseConnection.URL = `${environment.apiGatewayUrl}/faccase`

   await this._facCaseConnection.Connect();

   if (this._facCaseConnection.IsConnected) {
     this.RegisterFacSubmittedEvents();
   }
 }

 protected RegisterFacSubmittedEvents(): void {
  this._facCaseConnection.Hub.on("FacCaseSubmitted", (data: any) => {
    console.log(data);
    const received = `Fac Case Submitted`;
    this.messageService.add({
      severity: "info",
      detail: received,
      life: 3000,
    });
  });
}


  async CreateRetroConnection() {
     //this._retroConnection.URL = `${environment.apiGatewayUrl}/facdecision`
     this._retroConnection.URL = `${environment.apiGatewayUrl}/retrohub`;
    await this._retroConnection.Connect();

    if (this._retroConnection.IsConnected) {
      this.RegisterRetroEvents();
    }
  }

  protected RegisterRetroEvents(): void {
    this._retroConnection.Hub.on("SplitGenerated", (data: any) => {
      console.log(data);
      const received = `Split Generated ${data.firstName}`;
      this.messageService.add({
        severity: "info",
        detail: received,
        life: 5000,
      });
    });

        this._retroConnection.Hub.on("ErrorOccurred", (data: any) => {
      console.log(data);

      this.messageService.add({
        severity: "error",
        detail: data,
        life: 3000,
      });
    });
  }

  generateSplit() {
      var splitInfo = <NaarSplitGenerateInfo>{cessionId: "12345", asOfDate: new Date(), connectionId: this._retroConnection.ConnectionId};


      this._retroConnection.InvokeHubMethod("GenerateNaarSplit",splitInfo);

  }

  submitMib() {
    //this._httpService.getData(`${environment.apiGatewayUrl}/fac/submitMib`);
    var mibSubmitted = <MibSubmitted> {
        userConnectionId: this._connectionId,
        facCase: <FacCase> {
          caseNumber: 12345,
          firstName: "Vincent",
          lastName: "Simone",
          dob: "11/1/2000",
        }
    };


     this._httpService.postData(`${environment.apiGatewayUrl}/fac/submitMib`,mibSubmitted);
    this.messageService.add({
      severity: "info",
      summary: "Mib Submitted",
      life: 2000,
    });
  }

  submitCaseDecision() {
    this._httpService.getData(`${environment.apiGatewayUrl}/fac/FacCaseDecision`);
    this.messageService.add({
      severity: "info",
      summary: "Case Decsion Submitted",
      life: 2000,
    });
  }

  submitCase() {
    this._httpService.getData(`${environment.apiGatewayUrl}/fac/SubmitCase`);
    this.messageService.add({
      severity: "info",
      summary: "Case Submitted",
      life: 2000,
    });
  }
}
