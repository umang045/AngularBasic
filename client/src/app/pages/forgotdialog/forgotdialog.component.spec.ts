import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotdialogComponent } from './forgotdialog.component';

describe('ForgotdialogComponent', () => {
  let component: ForgotdialogComponent;
  let fixture: ComponentFixture<ForgotdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
