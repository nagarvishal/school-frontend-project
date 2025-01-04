import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CAssesmentComponent } from './c-assesment.component';

describe('CAssesmentComponent', () => {
  let component: CAssesmentComponent;
  let fixture: ComponentFixture<CAssesmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CAssesmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CAssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
