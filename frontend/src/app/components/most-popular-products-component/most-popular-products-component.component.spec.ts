import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularProductsComponentComponent } from './most-popular-products-component.component';

describe('MostPopularProductsComponentComponent', () => {
  let component: MostPopularProductsComponentComponent;
  let fixture: ComponentFixture<MostPopularProductsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPopularProductsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopularProductsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
