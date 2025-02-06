import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglmapComponent } from './googlmap.component';

describe('GooglmapComponent', () => {
  let component: GooglmapComponent;
  let fixture: ComponentFixture<GooglmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GooglmapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GooglmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
