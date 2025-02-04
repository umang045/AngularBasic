import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProdListComponent } from './seller-prod-list.component';

describe('SellerProdListComponent', () => {
  let component: SellerProdListComponent;
  let fixture: ComponentFixture<SellerProdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerProdListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerProdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
