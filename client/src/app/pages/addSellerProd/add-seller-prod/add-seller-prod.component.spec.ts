import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSellerProdComponent } from './add-seller-prod.component';

describe('AddSellerProdComponent', () => {
  let component: AddSellerProdComponent;
  let fixture: ComponentFixture<AddSellerProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSellerProdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSellerProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
