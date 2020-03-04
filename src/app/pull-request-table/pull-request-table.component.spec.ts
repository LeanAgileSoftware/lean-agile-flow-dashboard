import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { UserSettingsService } from '../user-settings.service';
import { GithubService } from '../github.service';
import { PullRequestTableComponent } from './pull-request-table.component';
import { TimeAgoPipe } from 'time-ago-pipe';

describe('PullRequestTableComponent', () => {
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
