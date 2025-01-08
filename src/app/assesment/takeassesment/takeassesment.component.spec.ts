import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeassesmentComponent } from './takeassesment.component';

describe('TakeassesmentComponent', () => {
  let component: TakeassesmentComponent;
  let fixture: ComponentFixture<TakeassesmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TakeassesmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TakeassesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
