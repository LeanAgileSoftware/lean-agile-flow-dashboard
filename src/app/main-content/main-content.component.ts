import { Component, OnInit, Output } from '@angular/core';
import { PullRequestTableFilter } from '../pull-request-table/pull-request-table-filter.interface';
import { FilterOperator } from '../interfaces';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  @Output()
  public filterList: PullRequestTableFilter[];

  constructor() {
    this.filterList = new Array<PullRequestTableFilter>();
    this.filterList.push(new PullRequestTableFilter(FilterOperator.STATUS, 'status: open', 'Open Pull Requests'));
  }

  ngOnInit(): void {
  }

}
