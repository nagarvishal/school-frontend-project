import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TAssesmentComponent } from './t-assesment.component';

describe('TAssesmentComponent', () => {
  let component: TAssesmentComponent;
  let fixture: ComponentFixture<TAssesmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TAssesmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TAssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
