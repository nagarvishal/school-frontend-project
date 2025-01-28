import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAssesmentComponent } from './review-assesment.component';

describe('ReviewAssesmentComponent', () => {
  let component: ReviewAssesmentComponent;
  let fixture: ComponentFixture<ReviewAssesmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewAssesmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewAssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
