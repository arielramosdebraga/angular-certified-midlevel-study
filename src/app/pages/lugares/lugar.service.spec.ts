import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LugarService } from './lugar.service';
import { Lugar } from './lugar';

describe('LugarService', () => {
  let service: LugarService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LugarService],
    });

    service = TestBed.inject(LugarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar uma lista de lugares (obterTodas)', () => {
    const mockLugares: Lugar[] = [
      {
        nome: 'Praia',
        categoria: 'Praia',
        localizacao: 'SC',
        urlFoto: 'url1',
        avaliacao: 5,
      },
      {
        nome: 'Hotel',
        categoria: 'Hotel',
        localizacao: 'SP',
        urlFoto: 'url2',
        avaliacao: 4,
      },
    ];

    service.obterTodas().subscribe((lugares) => {
      expect(lugares.length).toBe(2);
      expect(lugares).toEqual(mockLugares);
    });

    const req = httpMock.expectOne('http://localhost:3000/lugares');
    expect(req.request.method).toBe('GET');

    req.flush(mockLugares);
  });

  it('deve salvar um novo lugar (salvar)', () => {
    const novoLugar: Lugar = {
      nome: 'Novo Lugar',
      categoria: 'Teste',
      localizacao: 'Cidade',
      urlFoto: 'url3',
      avaliacao: 1,
    };

    service.salvar(novoLugar).subscribe((lugarSalvo) => {
      expect(lugarSalvo).toEqual(novoLugar);
    });

    const req = httpMock.expectOne('http://localhost:3000/lugares');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(novoLugar);

    req.flush(novoLugar);
  });
});
