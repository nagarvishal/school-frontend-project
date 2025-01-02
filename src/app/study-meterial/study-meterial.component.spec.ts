import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyMeterialComponent } from './study-meterial.component';

describe('StudyMeterialComponent', () => {
  let component: StudyMeterialComponent;
  let fixture: ComponentFixture<StudyMeterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyMeterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyMeterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
