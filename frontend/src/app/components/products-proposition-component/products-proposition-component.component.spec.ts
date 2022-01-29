import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPropositionComponentComponent } from './products-proposition-component.component';

describe('ProductsPropositionComponentComponent', () => {
  let component: ProductsPropositionComponentComponent;
  let fixture: ComponentFixture<ProductsPropositionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsPropositionComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsPropositionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
