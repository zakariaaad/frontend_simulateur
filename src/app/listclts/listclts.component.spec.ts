import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcltsComponent } from './listclts.component';

describe('ListcltsComponent', () => {
  let component: ListcltsComponent;
  let fixture: ComponentFixture<ListcltsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcltsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcltsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
