import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomizeProductsMenuComponentComponent } from './randomize-products-menu-component.component';

describe('RandomizeProductsMenuComponentComponent', () => {
  let component: RandomizeProductsMenuComponentComponent;
  let fixture: ComponentFixture<RandomizeProductsMenuComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomizeProductsMenuComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomizeProductsMenuComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
