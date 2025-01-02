import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOnboardingComponent } from './student-onboarding.component';

describe('StudentOnboardingComponent', () => {
  let component: StudentOnboardingComponent;
  let fixture: ComponentFixture<StudentOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentOnboardingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
