import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { MatGridListModule,
         MatCardModule,
         MatMenuModule,
         MatIconModule,
         MatButtonModule,
         MatToolbarModule,
         MatInputModule,
         MatFormFieldModule,
         } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { PullRequestComponent } from './pull-request/pull-request.component';
import { PullRequestTableComponent } from './pull-request-table/pull-request-table.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TimeAgoPipe } from 'time-ago-pipe';
import { TokenInterceptor } from './http-interceptors/token-interceptor';
import { BaseUrlInterceptor } from './http-interceptors/base-url-interceptor';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserAuthStepperComponent } from './user-auth-stepper/user-auth-stepper.component';
import { GithubService } from './github.service';
import { UserSettingsService } from './user-settings.service';

const appRoutes: Routes = [
  { path: 'dashboard', component: PullRequestTableComponent},
  { path: 'settings', component: UserAuthComponent},
  { path: '',
    redirectTo: '/settings',
    pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PullRequestComponent,
    PullRequestTableComponent,
    UserAuthComponent,
    PageNotFoundComponent,
    UserAuthStepperComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    LayoutModule,
    MatTableModule,
    HttpClientModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    GithubService,
    UserSettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
