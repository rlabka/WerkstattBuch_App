import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechnungComponent } from './rechnung.component';

describe('RechnungComponent', () => {
  let component: RechnungComponent;
  let fixture: ComponentFixture<RechnungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RechnungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechnungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
