import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImagenTacComponent } from './list-imagen-tac.component';

describe('ListImagenTacComponent', () => {
  let component: ListImagenTacComponent;
  let fixture: ComponentFixture<ListImagenTacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListImagenTacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListImagenTacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
