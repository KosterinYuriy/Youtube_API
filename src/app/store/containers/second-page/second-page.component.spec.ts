import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondPageComponent } from './second-page.component';

describe('SecondPageComponent (minimal)', () => {
  it('should create', () => {
    TestBed.configureTestingModule({declarations: [SecondPageComponent]});
    const fixture = TestBed.createComponent(SecondPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
