import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmAdminComponent } from './sm-admin.component';

describe('SmAdminComponent', () => {
  let component: SmAdminComponent;
  let fixture: ComponentFixture<SmAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
