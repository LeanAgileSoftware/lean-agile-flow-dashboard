import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GithubService } from '../github.service';
import { TokenInterceptor } from './token-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import * as Interfaces from '../interfaces';
import * as MockData from '../mock-github-service-data';
import { UserSettingsService } from '../user-settings.service';
import { UserSettings } from '../user-settings';

describe(`TokenInterceptor`, () => {
  let service: GithubService;
  let httpMock: HttpTestingController;
  let settingsServiceSpy: jasmine.SpyObj<UserSettingsService>;

  beforeEach(() => {
    settingsServiceSpy = jasmine.createSpyObj('UserSettingsService', ['getUserSettings']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GithubService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
        {
          provide: UserSettingsService,
          useValue: settingsServiceSpy
        }
      ],
    });

    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should add an Authorization header', () => {
    const testData: Interfaces.IssueSearchResult = MockData.ISSUE_SEARCH1;
    const mockUserSettings: UserSettings = new UserSettings('blah', 'test', 'a,b,c');
    settingsServiceSpy.getUserSettings.and.returnValue(mockUserSettings);
    service.getPullRequests('test').subscribe(
      response => expect(response).toBeTruthy(),
      err => fail('Test failed')
    );
    const httpRequest = httpMock.expectOne(
      req => req.method === 'GET' &&
      req.url === '/search/issues?q=type:pr+author:test');
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toEqual('Bearer test');
  });
});
