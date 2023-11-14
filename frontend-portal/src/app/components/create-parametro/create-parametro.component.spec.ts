import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateParametroComponent } from './create-parametro.component';
import { FormBuilder } from '@angular/forms';
import { ParametroService } from 'src/app/services/parametro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CreateParametroComponent', () => {
  let component: CreateParametroComponent;
  let fixture: ComponentFixture<CreateParametroComponent>;
  let parametroService: jasmine.SpyObj<ParametroService>;
  let activatedRoute: any; // Dependiendo de cómo manejes el ActivatedRoute en tu código

  beforeEach(() => {
    parametroService = jasmine.createSpyObj('ParametroService', ['getById', 'create', 'update']);
    
    TestBed.configureTestingModule({
      declarations: [CreateParametroComponent],
      providers: [
        FormBuilder,
        { provide: ParametroService, useValue: parametroService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        Router
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the CreateParametroComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with the required fields', () => {
    expect(component.parametroForm.contains('parametro')).toBeTruthy();
    expect(component.parametroForm.contains('valor')).toBeTruthy();
    expect(component.parametroForm.contains('descripcion')).toBeTruthy();
  });

  it('should set edit to true when parametroId is defined', () => {
    component.parametroId = '1';
    component.ngOnInit();
    expect(component.edit).toBe(true);
  });

  it('should fetch parameter for edit', () => {
    const fakeParametro = { parametro: 'abc', valor: '123' }; // Ajusta el objeto a tu necesidad
    parametroService.getById.and.returnValue(of(fakeParametro));
    component.parametroId = '1';
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.parametroEdit).toEqual(fakeParametro);
    });
  });

  // ... Otras pruebas relacionadas con el comportamiento del formulario, acciones, etc.
});

