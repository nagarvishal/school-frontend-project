import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCariculamComponent } from './exam-cariculam.component';

describe('ExamCariculamComponent', () => {
  let component: ExamCariculamComponent;
  let fixture: ComponentFixture<ExamCariculamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamCariculamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamCariculamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
