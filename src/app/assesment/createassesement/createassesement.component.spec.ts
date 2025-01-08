import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateassesementComponent } from './createassesement.component';

describe('CreateassesementComponent', () => {
  let component: CreateassesementComponent;
  let fixture: ComponentFixture<CreateassesementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateassesementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateassesementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
