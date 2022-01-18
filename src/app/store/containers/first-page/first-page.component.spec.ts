import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPageComponent } from './first-page.component';
import {HttpClientModule} from "@angular/common/http";


describe('first page', () => {
  it('should create', () => {
    TestBed.configureTestingModule({declarations: [FirstPageComponent],imports: [HttpClientModule]});
    const fixture = TestBed.createComponent(FirstPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
