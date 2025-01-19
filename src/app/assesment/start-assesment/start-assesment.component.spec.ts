import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAssesmentComponent } from './start-assesment.component';

describe('StartAssesmentComponent', () => {
  let component: StartAssesmentComponent;
  let fixture: ComponentFixture<StartAssesmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartAssesmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartAssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
