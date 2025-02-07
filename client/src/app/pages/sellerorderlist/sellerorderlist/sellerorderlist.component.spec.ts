import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerorderlistComponent } from './sellerorderlist.component';

describe('SellerorderlistComponent', () => {
  let component: SellerorderlistComponent;
  let fixture: ComponentFixture<SellerorderlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerorderlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerorderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
