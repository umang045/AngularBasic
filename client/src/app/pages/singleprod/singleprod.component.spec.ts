import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleprodComponent } from './singleprod.component';

describe('SingleprodComponent', () => {
  let component: SingleprodComponent;
  let fixture: ComponentFixture<SingleprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleprodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
