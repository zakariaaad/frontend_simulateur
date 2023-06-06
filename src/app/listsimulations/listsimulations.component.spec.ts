import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsimulationsComponent } from './listsimulations.component';

describe('ListsimulationsComponent', () => {
  let component: ListsimulationsComponent;
  let fixture: ComponentFixture<ListsimulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsimulationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsimulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
