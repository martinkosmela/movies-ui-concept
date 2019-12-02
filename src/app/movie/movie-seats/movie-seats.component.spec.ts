import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSeatsComponent } from './movie-seats.component';

describe('MovieSeatsComponent', () => {
  let component: MovieSeatsComponent;
  let fixture: ComponentFixture<MovieSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
