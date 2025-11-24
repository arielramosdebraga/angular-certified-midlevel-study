import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

@Component({ selector: 'app-router-outlet', template: '' })
class MockRouterOutletComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MockRouterOutletComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
  });

  it('deve criar o componente com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it(`deve ter o título 'Sistema de Gestão'`, () => {
    expect(component.title).toEqual('Sistema de Gestão');
  });

  it('deve definir o título da página corretamente no ngOnInit', () => {
    const setTitleSpy = spyOn(titleService, 'setTitle').and.callThrough();

    fixture.detectChanges();

    expect(setTitleSpy).toHaveBeenCalledWith('Sistema de Gestão');
  });
});
