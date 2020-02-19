import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { UserSettingsService } from '../user-settings.service';
import { PullRequestTableComponent } from './pull-request-table.component';

xdescribe('PullRequestTableComponent', () => {
  let component: PullRequestTableComponent;
  let fixture: ComponentFixture<PullRequestTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PullRequestTableComponent ],
      imports: [MatTableModule,
                BrowserAnimationsModule],
      providers: [UserSettingsService]
    })
    .compileComponents();
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
