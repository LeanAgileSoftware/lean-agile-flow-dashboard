import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GithubService } from '../github.service';
import { BaseUrlInterceptor } from './base-url-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import * as Interfaces from '../interfaces';
import * as MockData from '../mock-github-service-data';
import { UserSettingsService } from '../user-settings.service';
import { UserSettings } from '../user-settings';

describe(`BaseUrlInterceptor`, () => {
  let service: GithubService;
  let httpMock: HttpTestingController;
  let settingsServiceSpy: jasmine.SpyObj<UserSettingsService>;


  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserSettingsService', ['getUserSettings']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GithubService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: BaseUrlInterceptor,
          multi: true,
        },
        {
          provide: UserSettingsService,
          useValue: spy
        }
      ],
    });

    service = TestBed.get(GithubService);
    httpMock = TestBed.get(HttpTestingController);
    settingsServiceSpy = TestBed.get(UserSettingsService);
  });

  it('should add the base URL', () => {
    const testUrl = 'http://testUrl';
    const testData: Interfaces.IssueSearchResult = MockData.ISSUE_SEARCH1;
    const mockUserSettings: UserSettings = new UserSettings(testUrl, 'test', 'a,b,c');
    settingsServiceSpy.getUserSettings.and.returnValue(mockUserSettings);
    localStorage.setItem('baseUrl', testUrl);
    service.getPullRequests('test').subscribe(
      response => expect(response).toBeTruthy(),
      err => fail('Received error')
    );
    const httpRequest = httpMock.expectOne(
      req => req.method === 'GET' &&
      req.url === `${testUrl}/search/issues?q=type:pr+author:test`);
  });
});
