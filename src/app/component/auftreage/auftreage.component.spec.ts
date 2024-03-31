import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftreageComponent } from './auftreage.component';

describe('AuftreageComponent', () => {
  let component: AuftreageComponent;
  let fixture: ComponentFixture<AuftreageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuftreageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuftreageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
