import { TestBed } from '@angular/core/testing';
import { GithubService } from './github.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as Interfaces from './interfaces';
import * as Mocks from '../../test/mock-data/issue-search-mock';


describe('GithubService', () => {
  let githubService: GithubService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {


    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        HttpClientTestingModule,
        GithubService,
      ]
    });
    githubService = TestBed.inject(GithubService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(githubService).toBeTruthy();
  });

  describe('getPullRequests()', () => {

    it('should return an Observable<IssueSearchResult>', () => {
      const service: GithubService = TestBed.inject(GithubService);
      service.getPullRequests('test').subscribe(
        data => expect(data).toBeTruthy(),
        error => fail('Expected valid data, but got an error' + error.message)
      );
      const req = httpTestingController.expectOne('/search/issues?q=type:pr+author:test');
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
    it('should retrieve a valid search result with multiple results', () => {
      const service: GithubService = TestBed.inject(GithubService);
      service.getPullRequests('test').subscribe(
        data => {
          expect(data).toBeTruthy();
          expect(data.total_count).toEqual(2);
        },
        error => fail('Expected valid data')
      );
      const req = httpTestingController.expectOne('/search/issues?q=type:pr+author:test');
      expect(req.request.method).toEqual('GET');
      req.flush(Mocks.issueSearchMock);
    });
  });
});
