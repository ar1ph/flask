import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10TableComponent } from './top10-table.component';

describe('Top10TableComponent', () => {
  let component: Top10TableComponent;
  let fixture: ComponentFixture<Top10TableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Top10TableComponent]
    });
    fixture = TestBed.createComponent(Top10TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
