import { Injectable } from '@angular/core';
import { UserSettings } from './user-settings';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  private settings: UserSettings;
  private settingChangedSource = new Subject<UserSettings>();
  private settingChangedObservable = this.settingChangedSource.asObservable();
  constructor() {
    this.settings = new UserSettings();
  }
  setUserSettings(settings: UserSettings) {
    this.settings = settings;
    this.settingChangedSource.next();
  }
  getUserSettings(): UserSettings {
    return this.settings;
  }
  getObservable(): Observable<UserSettings> {
    return this.settingChangedObservable;
  }
}
