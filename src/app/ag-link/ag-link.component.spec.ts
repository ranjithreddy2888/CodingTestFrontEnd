import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgLinkComponent } from './ag-link.component';

describe('AgLinkComponent', () => {
  let component: AgLinkComponent;
  let fixture: ComponentFixture<AgLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
