import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent} from "../login-page/login-page.component";

describe('LoginPageComponent (minimal)', () => {
  it('should create', () => {
    TestBed.configureTestingModule({declarations: [LoginPageComponent]});
    const fixture = TestBed.createComponent(LoginPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
