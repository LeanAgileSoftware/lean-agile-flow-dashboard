import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatStepperModule } from '@angular/material/stepper';
import { UserAuthStepperComponent } from './user-auth-stepper.component';
import { ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UserSettings } from '../user-settings';
import { UserSettingsService } from '../user-settings.service';

describe('UserAuthStepperComponent', () => {
  let component: UserAuthStepperComponent;
  let fixture: ComponentFixture<UserAuthStepperComponent>;
  let spySettings: jasmine.SpyObj<UserSettingsService>;

  beforeEach(async(() => {
    spySettings = jasmine.createSpyObj('UserSettingsService', ['setUserSettings']);
    TestBed.configureTestingModule({
      imports: [ MatStepperModule,
                 ReactiveFormsModule,
                 MatFormFieldModule,
                 MatInputModule,
                 MatCardModule,
                 BrowserAnimationsModule ],
      declarations: [ UserAuthStepperComponent ],
      providers: [ {provide: UserSettingsService, useValue: spySettings} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle settings input', () => {
    const expectedSettings = new UserSettings('dummyApi', 'dummyToken', 'dummyUsers');
    component.onApiChange('dummyApi');
    component.onTokenChange('dummyToken');
    component.onUserChange('dummyUsers');

    component.onVerify();
    expect(spySettings.setUserSettings).toHaveBeenCalledWith(expectedSettings);
  });
});
