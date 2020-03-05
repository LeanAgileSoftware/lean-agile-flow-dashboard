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


describe('PullRequestTableComponent', () => {
  let component: PullRequestTableComponent;
  let fixture: ComponentFixture<PullRequestTableComponent>;
  let githubServiceSpy: jasmine.SpyObj<GithubService>;
  let userSettingsSpy: jasmine.SpyObj<UserSettingsService>;

  let mockSettings = new UserSettings('fake.github.com', 'abcdefg', 'user1, user2')

  beforeEach(async(() => {
    const mockGithubProvider = jasmine.createSpyObj('GithubService', ['verifyConnection', 'getPullRequestsForUsers']);
    const mockUserSettings = jasmine.createSpyObj('UserSettingsService', ['getObservable', 'getUserSettings']);
    TestBed.configureTestingModule({
      declarations: [ PullRequestTableComponent],
      imports: [MatGridListModule,
                MatTableModule,
                MatMenuModule,
                MatIconModule,
                MatCardModule,
                MatButtonModule,
                MatToolbarModule,
                MatInputModule,
                BrowserAnimationsModule],
      providers: [UserSettingsService, {provide: GithubService, useValue: mockGithubProvider}, {provide: UserSettingsService, useValue: mockUserSettings}]
    })
    .compileComponents();
    githubServiceSpy = TestBed.get(GithubService);
    userSettingsSpy = TestBed.get(UserSettingsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullRequestTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should process pull requests', () => {
    userSettingsSpy.getUserSettings.and.returnValue(mockSettings);
    githubServiceSpy.getPullRequestsForUsers.and.returnValue(of(MockData.ISSUE_SEARCH));
    fixture.detectChanges();
    expect(githubServiceSpy.getPullRequests).toHaveBeenCalledTimes(2);
  });

});
