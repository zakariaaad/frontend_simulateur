import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsimComponent } from './detailsim.component';

describe('DetailsimComponent', () => {
  let component: DetailsimComponent;
  let fixture: ComponentFixture<DetailsimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
