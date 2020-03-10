import { TestBed } from '@angular/core/testing';

import { UserSettingsService } from './user-settings.service';
import { SessionLoginInformation } from './interfaces';
import { UserSettings } from './user-settings';

describe('UserSettingsService', () => {
  let service: UserSettingsService;

  const testSettings: UserSettings = new UserSettings('test.github.com', 'abcd', 'bob, charlie');
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow setting and retrieval of login information', () => {
    service.setUserSettings(testSettings);
    expect(service.getUserSettings() === testSettings);
  });
});
