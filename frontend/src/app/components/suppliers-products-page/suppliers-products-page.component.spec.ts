import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersProductsPageComponent } from './suppliers-products-page.component';

describe('SuppliersProductsPageComponent', () => {
  let component: SuppliersProductsPageComponent;
  let fixture: ComponentFixture<SuppliersProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliersProductsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
