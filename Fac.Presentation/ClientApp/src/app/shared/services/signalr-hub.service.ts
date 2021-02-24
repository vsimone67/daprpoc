import { Injectable } from "@angular/core";
import { HubConnection } from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr";

@Injectable({
  providedIn: "root",
})
export class SignalrHubService {
  private _url: string;
  private _hubConnection: HubConnection | undefined;
  private _isConnected: boolean;

  constructor() {
    this._isConnected = false;
  }

  public async Connect() {
    if (!this._isConnected) {
      this._hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(this._url)
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      await this._hubConnection
        .start()
        .then(() => {
          this._isConnected = true;
        })
        .catch((err) => {
          console.error(err.toString());
        });
    }
  }

  public set URL(value: string) {
    this._url = value;
  }

  public get URL() {
    return this._url;
  }

  public get Hub(): HubConnection {
    return this._hubConnection;
  }

  public get IsConnected(): boolean {
    return this._isConnected;
  }

  public InvokeHubMethod(method: string, data: any): void {
    if (this._isConnected) {
      this._hubConnection.invoke(method, data);
    } else {
      throw "No connection has been established";
    }
  }

  public InvokeHubMethodNoParameters(method: string): void {
    if (this._isConnected) {
      this._hubConnection.invoke(method);
    } else {
      throw "No connection has been established";
    }
  }
}
