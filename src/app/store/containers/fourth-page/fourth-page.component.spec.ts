import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthPageComponent } from './fourth-page.component';

describe('FourthPageComponent (minimal)', () => {
  it('should create', () => {
    TestBed.configureTestingModule({declarations: [FourthPageComponent]});
    const fixture = TestBed.createComponent(FourthPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
