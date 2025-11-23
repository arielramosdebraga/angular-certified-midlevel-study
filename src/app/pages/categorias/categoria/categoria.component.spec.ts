import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaComponent } from './categoria.component';

describe('CategoriaComponent', () => {
  let component: CategoriaComponent;
  let fixture: ComponentFixture<CategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize a form group with required controls', () => {
    const form = component.camposForm;
    expect(form).toBeTruthy();
    expect(form.contains('nome')).toBeTrue();
    expect(form.contains('descricao')).toBeTrue();
  });

  it('should have nome and descricao invalid when empty', () => {
    const form = component.camposForm;
    const nome = form.get('nome');
    const descricao = form.get('descricao');

    nome?.setValue('');
    descricao?.setValue('');

    expect(nome?.invalid).toBeTrue();
    expect(descricao?.invalid).toBeTrue();
    expect(form.invalid).toBeTrue();
  });

  it('should mark form valid when both fields are provided', () => {
    const form = component.camposForm;
    form.setValue({ nome: 'Categoria X', descricao: 'Descricao Y' });

    expect(form.valid).toBeTrue();
  });

  it('should update validity when values change', () => {
    const form = component.camposForm;
    const nome = form.get('nome');
    const descricao = form.get('descricao');

    // initially empty -> invalid
    nome?.setValue('');
    descricao?.setValue('');
    expect(form.invalid).toBeTrue();

    // set valid values -> valid
    nome?.setValue('A');
    descricao?.setValue('B');
    expect(form.valid).toBeTrue();
  });

  it('should trim-like behavior be respected by validators (no implicit trim)', () => {
    const form = component.camposForm;
    const nome = form.get('nome');

    // if only spaces are entered, required validator considers it non-empty by default
    // unless a custom trim validator exists (it does not). We assert default behavior.
    nome?.setValue('   ');
    expect(nome?.valid).toBeTrue();
  });

  it('should initialize controls with empty string values', () => {
    const form = component.camposForm;
    expect(form.get('nome')?.value).toBe('');
    expect(form.get('descricao')?.value).toBe('');
  });

  it('should remain invalid if only nome is provided', () => {
    const form = component.camposForm;
    form.get('nome')?.setValue('Only Nome');
    form.get('descricao')?.setValue('');
    expect(form.invalid).toBeTrue();
    expect(form.get('nome')?.valid).toBeTrue();
    expect(form.get('descricao')?.invalid).toBeTrue();
  });

  it('should remain invalid if only descricao is provided', () => {
    const form = component.camposForm;
    form.get('nome')?.setValue('');
    form.get('descricao')?.setValue('Only Descricao');
    expect(form.invalid).toBeTrue();
    expect(form.get('nome')?.invalid).toBeTrue();
    expect(form.get('descricao')?.valid).toBeTrue();
  });

  it('should log value and validity when salvar is called on invalid form', () => {
    const spy = spyOn(console, 'log');
    const form = component.camposForm;
    form.setValue({ nome: '', descricao: '' });

    component.salvar();

    expect(spy).toHaveBeenCalledWith('valores digitados: ', form.value);
    expect(spy).toHaveBeenCalledWith('Está válido?', form.valid);
    expect(form.valid).toBeFalse();
  });

  it('should log value and validity when salvar is called on valid form', () => {
    const spy = spyOn(console, 'log');
    const form = component.camposForm;
    form.setValue({ nome: 'Nome', descricao: 'Descricao' });

    component.salvar();

    expect(spy).toHaveBeenCalledWith('valores digitados: ', form.value);
    expect(spy).toHaveBeenCalledWith('Está válido?', form.valid);
    expect(form.valid).toBeTrue();
  });

  // New tests
  it('should mark controls as touched and dirty when values are set', () => {
    const nome = component.camposForm.get('nome');
    const descricao = component.camposForm.get('descricao');

    nome?.setValue('abc');
    descricao?.setValue('def');

    expect(nome?.dirty).toBeTrue();
    expect(descricao?.dirty).toBeTrue();
  });

  it('should isCampoInvalido return true only when control is invalid and touched/dirty', () => {
    const nome = component.camposForm.get('nome');

    // invalid and pristine -> false
    nome?.setValue('');
    expect(component.isCampoInvalido('nome')).toBeFalse();

    // mark as touched -> true
    nome?.markAsTouched();
    expect(component.isCampoInvalido('nome')).toBeTrue();

    // set valid value -> false
    nome?.setValue('valid');
    expect(component.isCampoInvalido('nome')).toBeFalse();
  });

  it('should handle unknown control name in isCampoInvalido gracefully', () => {
    // should not throw and should return false when control does not exist
    expect(() => component.isCampoInvalido('inexistente')).not.toThrow();
    expect(component.isCampoInvalido('inexistente')).toBeFalse();
  });

  it('should preserve previous values when only one control is updated', () => {
    const form = component.camposForm;
    form.setValue({ nome: 'A', descricao: 'B' });

    form.get('nome')?.setValue('C');

    expect(form.get('nome')?.value).toBe('C');
    expect(form.get('descricao')?.value).toBe('B');
  });

  it('should emit validation state changes when values transition from invalid to valid', () => {
    const form = component.camposForm;

    form.setValue({ nome: '', descricao: '' });
    expect(form.valid).toBeFalse();

    form.get('nome')?.setValue('X');
    form.get('descricao')?.setValue('Y');

    expect(form.valid).toBeTrue();
  });
});
