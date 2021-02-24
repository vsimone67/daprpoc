import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  private _configData: any;
  private _isConfigLoaded: boolean = false;
  constructor(private _http: HttpClient, private _messageService: MessageService) { }

  public async LoadConfigData(url: string) {
    try {
      if (!this._isConfigLoaded) {
        this._configData = await this._http.get(url).toPromise();
        this._isConfigLoaded = true;
      }
    }
    catch (e) {
      this._messageService.add({ severity: 'error', summary: e.name, detail: e.message });
    }
  }

  public GetValue(item: string): any {
    return this._configData[item];
  }

  public async GetConfigData<T>(url: string) {
    try {
      return await this._http.get<T>(url).toPromise();
    }
    catch (e) {
      this._messageService.add({ severity: 'error', summary: e.name, detail: e.message });
    }
  }
}
