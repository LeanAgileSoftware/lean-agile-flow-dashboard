import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GithubService } from '../github.service';
import { UserSettingsService } from '../user-settings.service';
import { PullRequestTableComponent } from './pull-request-table.component';
import { UserSettings } from '../user-settings';
import { of, Observable } from 'rxjs';
import * as MockData from '../mock-github-service-data';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { PullRequestTableFilter } from './pull-request-table-filter.interface';


describe('PullRequestTableComponent', () => {
  let component: PullRequestTableComponent;
  let fixture: ComponentFixture<PullRequestTableComponent>;
  let githubServiceSpy: jasmine.SpyObj<GithubService>;
  let userSettingsSpy: jasmine.SpyObj<UserSettingsService>;

  const mockSettings = new UserSettings('fake.github.com', 'abcdefg', 'user1, user2');

  beforeEach(async(() => {
    githubServiceSpy = jasmine.createSpyObj('GithubService', ['verifyConnection', 'getPullRequestsForUsers']);
    userSettingsSpy = jasmine.createSpyObj('UserSettingsService', ['getObservable', 'getUserSettings']);
    TestBed.configureTestingModule({
      declarations: [ PullRequestTableComponent, DateAgoPipe ],
      imports: [MatGridListModule,
                MatTableModule,
                MatMenuModule,
                MatIconModule,
                MatCardModule,
                MatButtonModule,
                MatToolbarModule,
                MatInputModule,
                BrowserAnimationsModule],
      providers: [UserSettingsService,
                  {provide: GithubService, useValue: githubServiceSpy},
                  {provide: UserSettingsService, useValue: userSettingsSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullRequestTableComponent);
    component = fixture.componentInstance;
    userSettingsSpy.getUserSettings.and.returnValue(mockSettings);
    githubServiceSpy.getPullRequestsForUsers.and.returnValue([of(MockData.ISSUE_SEARCH1), of(MockData.ISSUE_SEARCH2)]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should process pull requests with no filters', () => {
    expect(githubServiceSpy.getPullRequestsForUsers).toHaveBeenCalled();
    expect(component.theMap.size).toBe(25);
  });

  it('should filter for open pull requests', () => {
    component.applyFilter(PullRequestTableFilter.statusOpenFilter);
    expect(githubServiceSpy.getPullRequestsForUsers).toHaveBeenCalled();
    expect(component.dataSource.filteredData.length).toBe(1);
  });

  it('should filter for closed pull requests', () => {
    component.applyFilter(PullRequestTableFilter.statusClosedFilter);
    expect(githubServiceSpy.getPullRequestsForUsers).toHaveBeenCalled();
    expect(component.dataSource.filteredData.length).toBe(24);
  });

});
