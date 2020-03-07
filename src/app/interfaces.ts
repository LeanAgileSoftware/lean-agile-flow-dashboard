export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface PullRequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
}

export interface PullRequestView {
  url: string;
  title: string;
  author: string;
  org_repo_number: string;
  created_date: Date;
  updated_date: Date;
  status: string;
  diff_url: string;
  patch_url: string;
}

export interface Issue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: any[];
  state: string;
  locked: boolean;
  assignee?: any;
  assignees: any[];
  milestone?: any;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: any;
  author_association: string;
  pull_request: PullRequest;
  body: string;
  score: number;
  username?: string;
}

export enum IssueState {
  OPEN = 'open',
  CLOSED = 'closed',
  ALL = 'all'
}

export enum FilterOperator {
  STATUS = 'status'
}

export interface IssueSearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: Issue[];
}

export interface SessionLoginInformation {
  githubApi: string;
  githubToken: string;
  usersList: string;
}

export interface TableFilter {
  type: FilterOperator;
  value: string;
  name: string;
}
