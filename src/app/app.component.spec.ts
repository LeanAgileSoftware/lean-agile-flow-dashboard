import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

// Mocks
@Component({
  selector: 'app-main',
  template: ''
})
class MainComponent {
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MainComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Lean Agile Flow Dashboard'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Lean Agile Flow Dashboard');
  });
});

