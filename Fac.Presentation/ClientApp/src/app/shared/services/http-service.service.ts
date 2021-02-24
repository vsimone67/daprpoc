import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { Observable } from "rxjs";
import { EventService } from './event.service';
import { events } from '@constants/events.model';

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(
    private _http: HttpClient,
    private _messageService: MessageService,
    private _eventService: EventService
  ) { }

  async getData<T>(url: string,) {
    try {
      this._eventService.sendEvent(events.loadingEvent, true); // turn on loading spinner
      return await this._http.get<T>(url, { withCredentials: true }).toPromise().finally(() => this._eventService.sendEvent(events.loadingEvent, false));  // when http get ends call to turn off spinner
    } catch (e) {
      if (e != undefined) {
        console.error(`Error From API: ${url}`);
        console.error(`Error From API: ${e.message}`);
        this._messageService.add({
          severity: "error",
          summary: e.name,
          detail: e.message
        });
      } else {
        console.error(`Error From API: ${e.statusText}`);
        this._messageService.add({
          severity: "error",
          summary: e.name,
          detail: e.statusText
        });
      }
      throw e;
    }
  }

  async getDataAndResponse(url: string) {
    try {
      this._eventService.sendEvent(events.loadingEvent, true); // turn on loading spinner
      return await this._http.get(url, { observe: 'response', withCredentials: true }).toPromise().finally(() => this._eventService.sendEvent(events.loadingEvent, false));  // when http get ends call to turn off spinner
    } catch (e) {
      if (e != undefined) {
        console.error(`Error From API: ${url}`);
        console.error(`Error From API: ${e.message}`);
        this._messageService.add({
          severity: "error",
          summary: e.name,
          detail: e.message
        });
      } else {
        console.error(`Error From API: ${e.statusText}`);
        this._messageService.add({
          severity: "error",
          summary: e.name,
          detail: e.statusText
        });
      }
      throw e;
    }
  }

  async postData<T>(url: string, payload: any) {
    try {
      this._eventService.sendEvent(events.loadingEvent, true); // turn on loading spinner
      return await this._http.post<T>(url, payload).toPromise().finally(() => this._eventService.sendEvent(events.loadingEvent, false));  // when http get ends call to turn off spinner;
    } catch (e) {
      console.error(`Error From API: ${e.error.message}`);
      this._messageService.add({
        severity: "error",
        summary: e.name,
        detail: e.message
      });
      throw e;
    }
  }

  async putData<T>(url: string, payload: T) {
    try {
      return await this._http.put<T>(url, payload).toPromise();
    } catch (e) {
      console.error(`Error From API: ${e.error.message}`);
      this._messageService.add({
        severity: "error",
        summary: e.name,
        detail: e.message
      });
      throw e;
    }
  }

  getBlob(url: string): Observable<HttpEvent<Blob>> {
    return this._http.request(
      new HttpRequest("GET", url, null, {
        reportProgress: true,
        responseType: "blob"
      })
    );
  }

  uploadfile(url: string, payload: any) {
    return this._http.request(new HttpRequest("POST", url, payload));
  }
}
