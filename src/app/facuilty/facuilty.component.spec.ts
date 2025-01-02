import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacuiltyComponent } from './facuilty.component';

describe('FacuiltyComponent', () => {
  let component: FacuiltyComponent;
  let fixture: ComponentFixture<FacuiltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacuiltyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacuiltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
