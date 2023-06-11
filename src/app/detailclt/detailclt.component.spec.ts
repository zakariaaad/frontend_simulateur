import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcltComponent } from './detailclt.component';

describe('DetailcltComponent', () => {
  let component: DetailcltComponent;
  let fixture: ComponentFixture<DetailcltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailcltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailcltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
