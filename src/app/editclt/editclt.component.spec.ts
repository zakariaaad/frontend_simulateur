import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcltComponent } from './editclt.component';

describe('EditcltComponent', () => {
  let component: EditcltComponent;
  let fixture: ComponentFixture<EditcltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
