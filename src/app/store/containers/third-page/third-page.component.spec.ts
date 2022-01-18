import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPageComponent } from './third-page.component';

describe('ThirdPageComponent (minimal)', () => {
  it('should create', () => {
    TestBed.configureTestingModule({declarations: [ThirdPageComponent]});
    const fixture = TestBed.createComponent(ThirdPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
