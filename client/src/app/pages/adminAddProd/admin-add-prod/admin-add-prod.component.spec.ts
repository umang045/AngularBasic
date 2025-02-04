import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddProdComponent } from './admin-add-prod.component';

describe('AdminAddProdComponent', () => {
  let component: AdminAddProdComponent;
  let fixture: ComponentFixture<AdminAddProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddProdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
