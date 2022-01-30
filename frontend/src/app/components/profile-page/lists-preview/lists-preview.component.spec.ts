import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsPreviewComponent } from './lists-preview.component';

describe('ListsPreviewComponent', () => {
  let component: ListsPreviewComponent;
  let fixture: ComponentFixture<ListsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
