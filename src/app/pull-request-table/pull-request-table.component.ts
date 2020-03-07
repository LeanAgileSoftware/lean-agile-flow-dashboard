import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as Interfaces from '../interfaces';
import { UserSettingsService } from '../user-settings.service';
import { GithubService } from '../github.service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PullRequestTableFilter } from './pull-request-table-filter.interface';

interface ColumnData {
  key: string;
  name: string;
}
function statusSubFilter(data: Interfaces.PullRequestView, filter: string): boolean {
  const regex = /status: \w+/g;
  const matches = filter.match(regex);
  if (matches) {
    return data.status === matches[0].split(':')[1].trim().toLowerCase();
  }
  return true;
}

function tableFilter(data: Interfaces.PullRequestView, filter: string): boolean {
  return statusSubFilter(data, filter);
}


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
export class PullRequestTableComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource: MatTableDataSource<Interfaces.PullRequestView>;
  columnData: Map<ColumnData['key'], ColumnData['name']>;
  expandedElement: Interfaces.PullRequest | null;
  issues: Interfaces.Issue[];
  currentSelectedIssue: Interfaces.Issue;
  theMap: Map<number, Interfaces.Issue>;
  userSettingsSubRef: Subscription = null;
  columnNames: string[];

  @Input() public filter: PullRequestTableFilter;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userSettingsService: UserSettingsService,
              private githubService: GithubService) {
    this.theMap = new Map<number, Interfaces.Issue>();
    this.dataSource = new MatTableDataSource<Interfaces.PullRequestView>();
    this.dataSource.filter = this.filter ? this.filter.value : null;
    this.dataSource.filterPredicate = tableFilter;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filter: PullRequestTableFilter) {
    this.dataSource.filter = filter.value.trim().toLowerCase();
  }

  private transformIssueToViewModel(issue: Interfaces.Issue): Interfaces.PullRequestView {
    const issueIsOpen: string = issue.state;
    const regexp = new RegExp('repos\/(.+)\/(.+)$');
    const org_repo_split = regexp.exec(issue.repository_url);
    const organization: string = issue.repository_url;
    const orgRepoNumber = `${org_repo_split[1]}/${org_repo_split[2]} #${issue.number}`;
    return {
      url: issue.html_url,
      title: issue.title,
      author: issue.user.login,
      org_repo_number: orgRepoNumber,
      created_date: new Date(issue.created_at),
      updated_date: new Date(issue.updated_at),
      status: issueIsOpen,
      diff_url: issue.pull_request.diff_url,
      patch_url: issue.pull_request.patch_url
    };

  }

  private storeResults(results: Interfaces.IssueSearchResult) {
    for (const issue of results.items) {
      // pull in username at the the top level of the object so we don't have to dig for it later
      this.theMap.set(issue.id, {...issue, ...{username: issue.user.login}});
      this.dataSource.data = Array.from(this.theMap.values()).map(this.transformIssueToViewModel);
    }
  }

  public fetchPullRequests() {
    const observableArray = this.githubService.getPullRequestsForUsers
      (this.userSettingsService.getUserSettings().getTokenizedListOfUsers());
    if (observableArray) {
      observableArray.map(item => item.subscribe(
          x => this.storeResults(x),
          err => console.log(`There was an error fetching pull requests: ${err}`)
        )
      );
    }
  }

  ngOnInit(): void {
    // Setup columns
    this.columnData = new Map<ColumnData['key'], ColumnData['name']>();
    this.columnData.set('title', 'Title');
    this.columnData.set('author', 'Name');
    this.columnData.set('org_repo_number', 'Pull Request');
    this.columnData.set('author', 'Name');
    this.columnData.set('created_date', 'Created');
    this.columnData.set('updated_date', 'Updated');
    this.columnNames = Array.from(this.columnData.values());
    this.fetchPullRequests();
  }

  ngOnDestroy(): void {
  }

}
