import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSingleOrderComponent } from './seller-single-order.component';

describe('SellerSingleOrderComponent', () => {
  let component: SellerSingleOrderComponent;
  let fixture: ComponentFixture<SellerSingleOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerSingleOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerSingleOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
