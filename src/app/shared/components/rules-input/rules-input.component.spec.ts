import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesInputComponent } from './rules-input.component';

describe('RulesInputComponent', () => {
  let component: RulesInputComponent;
  let fixture: ComponentFixture<RulesInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
