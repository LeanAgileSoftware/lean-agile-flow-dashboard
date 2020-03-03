import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatTableModule} from '@angular/material/table';
import { MatGridListModule,
         MatCardModule,
         MatMenuModule,
         MatIconModule,
         MatButtonModule,
         MatToolbarModule,
         MatInputModule,
         MatFormFieldModule,
         } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { UserSettingsService } from '../user-settings.service';
import { GithubService } from '../github.service';
import { PullRequestTableComponent } from './pull-request-table.component';
import { TimeAgoPipe } from 'time-ago-pipe';

xdescribe('PullRequestTableComponent', () => {
  let component: PullRequestTableComponent;
  let fixture: ComponentFixture<PullRequestTableComponent>;
  let spyGithub: jasmine.SpyObj<GithubService>;

  beforeEach(async(() => {
    const mockGithubProvider = jasmine.createSpyObj('GithubService', ['verifyConnection', 'getPullRequestsForUsers']);
    TestBed.configureTestingModule({
      declarations: [ PullRequestTableComponent, TimeAgoPipe ],
      imports: [MatGridListModule,
                MatTableModule,
                MatMenuModule,
                MatIconModule,
                MatCardModule,
                MatButtonModule,
                MatToolbarModule,
                MatInputModule,
                BrowserAnimationsModule],
      providers: [UserSettingsService, {provide: GithubService, useValue: mockGithubProvider}]
    })
    .compileComponents();
    spyGithub = TestBed.get(GithubService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
