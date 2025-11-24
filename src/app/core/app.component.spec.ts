import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

@Component({ selector: 'app-router-outlet', template: '' })
class MockRouterOutletComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MockRouterOutletComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it(`deve ter o título 'Sistema de Gestão'`, () => {
    expect(component.title).toEqual('Sistema de Gestão');
  });
});
