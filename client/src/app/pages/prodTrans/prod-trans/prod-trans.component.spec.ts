import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdTransComponent } from './prod-trans.component';

describe('ProdTransComponent', () => {
  let component: ProdTransComponent;
  let fixture: ComponentFixture<ProdTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdTransComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
