import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Equipos } from './equipos';

describe('Equipos', () => {
  let component: Equipos;
  let fixture: ComponentFixture<Equipos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Equipos],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Equipos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
