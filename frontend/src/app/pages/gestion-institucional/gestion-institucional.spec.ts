import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionInstitucional } from './gestion-institucional';

describe('GestionInstitucional', () => {
  let component: GestionInstitucional;
  let fixture: ComponentFixture<GestionInstitucional>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionInstitucional],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionInstitucional);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
