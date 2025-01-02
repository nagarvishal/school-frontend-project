import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherOnboardingComponent } from './teacher-onboarding.component';

describe('TeacherOnboardingComponent', () => {
  let component: TeacherOnboardingComponent;
  let fixture: ComponentFixture<TeacherOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherOnboardingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
