import { Component, OnInit, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as Interfaces from '../interfaces';
import { UserSettingsService } from '../user-settings.service';
import { GithubService } from '../github.service';
import { zip, Subscription } from 'rxjs';

@Component({
  selector: 'app-pull-request-table',
  templateUrl: './pull-request-table.component.html',
  styleUrls: ['./pull-request-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class PullRequestTableComponent implements OnInit, OnDestroy {
  dataSource = ['temp'];
  columnsToDisplay = ['pull request', 'state', 'organization', 'name'];
  expandedElement: Interfaces.PullRequest | null;
  users: string[];
  issues: Interfaces.Issue[];
  currentSelectedIssue: Interfaces.Issue;
  theMap: Map<number, Interfaces.Issue>;
  userSettingsSubRef: Subscription = null;

  constructor(private userSettingsService: UserSettingsService,
              private githubService: GithubService) {
    this.theMap = new Map<number, Interfaces.Issue>();
    this.userSettingsSubRef = this.userSettingsService.settingChangedObservable.subscribe(() => this.fetchPullRequests());
    }


  private storeResults(results: Interfaces.IssueSearchResult) {
    for (const issue of results.items) {
      this.theMap.set(issue.id, issue);
    }
  }

  public fetchPullRequests() {
    const observableArray = this.githubService.getPullRequestsForUsers
      (this.userSettingsService.getUserSettings().getTokenizedListOfUsers());
    observableArray.map(item => item.subscribe(
        x => this.storeResults(x),
        err => console.log(`There was an error fetching pull requests: ${err}`)
      )
    );
  }

  ngOnInit(): void {
    this.fetchPullRequests();
  }

  ngOnDestroy(): void {
      this.userSettingsSubRef.unsubscribe();
  }

}
