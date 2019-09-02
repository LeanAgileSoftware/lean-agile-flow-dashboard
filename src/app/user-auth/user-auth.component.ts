import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsService } from '../user-settings.service';
import { GithubService } from '../github.service';
import { UserSettings } from '../user-settings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  @Input() public sessionInfo: UserSettings;

  constructor(private settingsService: UserSettingsService,
              private githubService: GithubService,
              private router: Router) { }

  ngOnInit() {
    const userSettings = this.settingsService.getUserSettings();
    if (userSettings.githubApi &&
      userSettings.githubToken &&
      userSettings.usersList) {
          this.router.navigate(['dashboard']);
      }
  }

  processSettings() {
    const userList = this.settingsService.getUserSettings().usersList;
    const users: string[] = userList.split(',');
    for (const user of users) {
      this.githubService.getPullRequests(user);
    }
  }

}
