import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FourthPageComponent } from './fourth-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FourthPageComponent (minimal)', () => {
  let component: FourthPageComponent;
  let fixture: ComponentFixture<FourthPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FourthPageComponent],
        providers: [],
        imports: [],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FourthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
