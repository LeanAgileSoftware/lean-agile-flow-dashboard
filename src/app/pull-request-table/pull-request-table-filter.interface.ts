import { FilterOperator, TableFilter } from '../interfaces';


export class PullRequestTableFilter implements TableFilter {
    static statusOpenFilter: PullRequestTableFilter =
        new PullRequestTableFilter(
            FilterOperator.STATUS,
            'status: Open',
            'Open Pull Requests');
    static statusClosedFilter: PullRequestTableFilter =
        new PullRequestTableFilter(
            FilterOperator.STATUS,
            'status: Closed',
            'Closed Pull Requests');

    constructor(public type: FilterOperator, public value: string, public name: string) {
    }
}
