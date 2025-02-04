import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashBoardComponent } from './seller-dash-board.component';

describe('SellerDashBoardComponent', () => {
  let component: SellerDashBoardComponent;
  let fixture: ComponentFixture<SellerDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerDashBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
