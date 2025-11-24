import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CategoriaComponent } from './categoria.component';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria';

describe('CategoriaComponent', () => {
  let component: CategoriaComponent;
  let fixture: ComponentFixture<CategoriaComponent>;
  let categoriaServiceSpy: jasmine.SpyObj<CategoriaService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CategoriaService', ['salvar']);

    await TestBed.configureTestingModule({
      imports: [CategoriaComponent, ReactiveFormsModule],
      providers: [{ provide: CategoriaService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaComponent);
    component = fixture.componentInstance;
    categoriaServiceSpy = TestBed.inject(
      CategoriaService,
    ) as jasmine.SpyObj<CategoriaService>;
    fixture.detectChanges();
  });

  it('deve ser criado com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com os campos "nome" e "descricao"', () => {
    expect(component.camposForm).toBeDefined();
    expect(component.camposForm.get('nome')).toBeDefined();
    expect(component.camposForm.get('descricao')).toBeDefined();
  });

  it('o formulário deve ser inválido quando vazio', () => {
    expect(component.camposForm.valid).toBeFalse();
  });

  it('o formulário deve ser válido quando preenchido corretamente', () => {
    component.camposForm.get('nome')?.setValue('Nome Teste');
    component.camposForm.get('descricao')?.setValue('Descricao Teste');
    expect(component.camposForm.valid).toBeTrue();
  });

  it('deve chamar o service.salvar() e resetar o formulário em caso de sucesso', () => {
    const mockCategoria: Categoria = { nome: 'Eletronicos', descricao: 'Desc' };

    categoriaServiceSpy.salvar.and.returnValue(of(mockCategoria));

    component.camposForm.get('nome')?.setValue(mockCategoria.nome);
    component.camposForm.get('descricao')?.setValue(mockCategoria.descricao);

    const formResetSpy = spyOn(component.camposForm, 'reset').and.callThrough();

    component.salvar();

    expect(categoriaServiceSpy.salvar).toHaveBeenCalledOnceWith(mockCategoria);
    expect(formResetSpy).toHaveBeenCalled();
  });

  it('deve logar um erro se o service.salvar() falhar', () => {
    const errorResponse = new Error('Erro de API');

    categoriaServiceSpy.salvar.and.returnValue(throwError(() => errorResponse));

    component.camposForm.get('nome')?.setValue('Valido');
    component.camposForm.get('descricao')?.setValue('Valido');

    const consoleErrorSpy = spyOn(console, 'error');

    component.salvar();

    expect(categoriaServiceSpy.salvar).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Ocorreu um erro:',
      errorResponse,
    );
  });
});
