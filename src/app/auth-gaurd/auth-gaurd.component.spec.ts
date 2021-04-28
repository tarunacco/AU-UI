import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGaurdComponent } from './auth-gaurd.component';

describe('AuthGaurdComponent', () => {
  let component: AuthGaurdComponent;
  let fixture: ComponentFixture<AuthGaurdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthGaurdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthGaurdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
