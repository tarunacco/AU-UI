import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FisrtHomeComponent } from './fisrt-home.component';

describe('FisrtHomeComponent', () => {
  let component: FisrtHomeComponent;
  let fixture: ComponentFixture<FisrtHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FisrtHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FisrtHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
