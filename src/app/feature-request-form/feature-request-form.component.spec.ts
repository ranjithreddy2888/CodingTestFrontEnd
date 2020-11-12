import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureRequestFormComponent } from './feature-request-form.component';

describe('FeatureRequestFormComponent', () => {
  let component: FeatureRequestFormComponent;
  let fixture: ComponentFixture<FeatureRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
