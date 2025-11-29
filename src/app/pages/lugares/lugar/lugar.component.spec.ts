import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

import { LugarComponent } from './lugar.component';
import { CategoriaService } from '@pages/categorias/categoria.service';
import { LugarService } from '../lugar.service';
import { Categoria } from '@pages/categorias/categoria';
import { Lugar } from '../lugar';

class MockCategoriaService {
  obterTodas = jasmine.createSpy('obterTodas').and.returnValue(of([]));
}

class MockLugarService {
  salvar = jasmine.createSpy('salvar').and.returnValue(of({}));
}

describe('LugarComponent', () => {
  let component: LugarComponent;
  let fixture: ComponentFixture<LugarComponent>;
  let categoriaService: MockCategoriaService;
  let lugarService: MockLugarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LugarComponent, CommonModule, ReactiveFormsModule],
      providers: [
        { provide: CategoriaService, useClass: MockCategoriaService },
        { provide: LugarService, useClass: MockLugarService },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LugarComponent);
    component = fixture.componentInstance;
    categoriaService = TestBed.inject(
      CategoriaService,
    ) as unknown as MockCategoriaService;
    lugarService = TestBed.inject(LugarService) as unknown as MockLugarService;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com campos vazios e validadores requeridos', () => {
    expect(component.camposForm).toBeDefined();
    expect(component.camposForm.get('nome')?.valid).toBeFalsy();
    expect(component.camposForm.get('categoria')?.valid).toBeFalsy();
    expect(component.camposForm.get('avaliacao')?.value).toBe(0);
  });

  it('deve carregar as categorias ao iniciar (ngOnInit)', () => {
    const mockCategorias: Categoria[] = [
      { id: 1, nome: 'Hotel', descricao: 'Desc' },
    ];
    categoriaService.obterTodas.and.returnValue(of(mockCategorias));

    component.ngOnInit();

    expect(categoriaService.obterTodas).toHaveBeenCalledTimes(1);
    expect(component.categorias.length).toBe(1);
    expect(component.categorias).toEqual(mockCategorias);
  });

  it('deve lidar com erro ao carregar categorias', () => {
    spyOn(console, 'error');
    categoriaService.obterTodas.and.returnValue(
      throwError(() => new Error('Erro de API')),
    );

    component.ngOnInit();

    expect(console.error).toHaveBeenCalled();
    expect(component.categorias.length).toBe(0);
  });

  it('isCampoInvalido deve retornar true se o campo for inválido e tocado/sujo', () => {
    const campoNome = component.camposForm.get('nome');
    campoNome?.setValue('');
    campoNome?.markAsDirty();
    campoNome?.markAsTouched();

    expect(component.isCampoInvalido('nome')).toBe(true);
  });

  it('isCampoInvalido deve retornar false se o campo for válido', () => {
    const campoNome = component.camposForm.get('nome');
    campoNome?.setValue('Nome Válido');

    expect(component.isCampoInvalido('nome')).toBe(false);
  });

  it('não deve chamar salvar no service se o formulário for inválido', () => {
    component.camposForm.get('nome')?.setValue(''); // Inválido
    component.salvar();
    expect(lugarService.salvar).not.toHaveBeenCalled();
  });

  it('deve chamar salvar no service, resetar o form e logar sucesso se o formulário for válido', () => {
    spyOn(component.camposForm, 'reset').and.callThrough();
    spyOn(console, 'log');

    const lugarValido: Lugar = {
      nome: 'Lugar Teste',
      categoria: 'Categoria Teste',
      localizacao: 'Local Teste',
      urlFoto: 'http://foto.com',
      avaliacao: 4,
    };

    component.camposForm.setValue(lugarValido);
    lugarService.salvar.and.returnValue(of(lugarValido));

    component.salvar();

    expect(lugarService.salvar).toHaveBeenCalledOnceWith(lugarValido);
    expect(component.camposForm.reset).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      'Lugar salvo com sucesso!:',
      jasmine.any(Object),
    );
    expect(console.log).toHaveBeenCalledWith(
      'Dados do lugar válidos para salvar:',
      jasmine.any(Object),
    );
  });

  it('deve lidar com erro durante a operação de salvar', () => {
    spyOn(console, 'error');
    component.camposForm.get('nome')?.setValue('Válido');
    component.camposForm.get('categoria')?.setValue('Válido');
    component.camposForm.get('localizacao')?.setValue('Válido');
    component.camposForm.get('urlFoto')?.setValue('http://valid.url');
    component.camposForm.get('avaliacao')?.setValue(3);

    lugarService.salvar.and.returnValue(
      throwError(() => new Error('Erro ao salvar')),
    );

    component.salvar();

    expect(lugarService.salvar).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'Ocorreu um erro ao salvar o lugar:',
      jasmine.any(Error),
    );
  });
});
