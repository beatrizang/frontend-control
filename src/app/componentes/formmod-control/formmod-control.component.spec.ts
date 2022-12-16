import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormmodControlComponent } from './formmod-control.component';

describe('FormmodControlComponent', () => {
  let component: FormmodControlComponent;
  let fixture: ComponentFixture<FormmodControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormmodControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormmodControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
