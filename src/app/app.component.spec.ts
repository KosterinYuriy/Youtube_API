import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.componentInstance;

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'QualifyingWork'`, () => {
    expect(app.title).toEqual('QualifyingWork');
  });

  it('should render title', () => {
    fixture.detectChanges();
  });
});
