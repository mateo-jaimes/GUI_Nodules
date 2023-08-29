import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateImagenTacComponent } from './create-imagen-tac.component';

describe('CreateImagenTacComponent', () => {
  let component: CreateImagenTacComponent;
  let fixture: ComponentFixture<CreateImagenTacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateImagenTacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateImagenTacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
