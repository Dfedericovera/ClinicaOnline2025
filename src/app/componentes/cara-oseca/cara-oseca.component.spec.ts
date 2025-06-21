import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaraOSecaComponent } from './cara-oseca.component';

describe('CaraOSecaComponent', () => {
  let component: CaraOSecaComponent;
  let fixture: ComponentFixture<CaraOSecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaraOSecaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaraOSecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
