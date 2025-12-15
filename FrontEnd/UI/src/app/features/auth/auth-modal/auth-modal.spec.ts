import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthModel } from './auth-modal';

describe('AuthModel', () => {
  let component: AuthModel;
  let fixture: ComponentFixture<AuthModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
