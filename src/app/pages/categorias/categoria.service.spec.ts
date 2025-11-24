import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria';

describe('CategoriaService', () => {
  let service: CategoriaService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/categorias';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriaService],
    });

    service = TestBed.inject(CategoriaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado (instanciado) com sucesso', () => {
    expect(service).toBeTruthy();
  });

  it('deve realizar uma requisição POST para salvar uma nova categoria', () => {
    const mockCategoria: Categoria = { id: 1, nome: 'Eletrônicos' };

    service.salvar(mockCategoria).subscribe((categoria) => {
      expect(categoria).toEqual(mockCategoria);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCategoria);

    req.flush(mockCategoria);
  });

  it('deve realizar uma requisição GET para obter todas as categorias', () => {
    const mockCategorias: Categoria[] = [
      { id: 1, nome: 'Eletrônicos' },
      { id: 2, nome: 'Roupas' },
    ];

    service.obterTodas().subscribe((categorias) => {
      expect(categorias.length).toBe(2);
      expect(categorias).toEqual(mockCategorias);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockCategorias);
  });
});
