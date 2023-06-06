import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormclientComponent } from './formclient.component';

describe('FormclientComponent', () => {
  let component: FormclientComponent;
  let fixture: ComponentFixture<FormclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
