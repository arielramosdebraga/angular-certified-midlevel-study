import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';

import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria';

@Component({
  selector: 'app-categoria',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss',
})
export class CategoriaComponent {
  camposForm: FormGroup;
  private categoriaService = inject(CategoriaService);

  constructor() {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
    });
  }

  salvar() {
    if (this.camposForm.valid) {
      const novaCategoria: Categoria = this.camposForm.value;

      this.categoriaService.salvar(novaCategoria).subscribe({
        next: (response) => {
          console.log('Salva com sucesso!:', response);
          this.camposForm.reset();
        },
        error: (error) => {
          console.error('Ocorreu um erro:', error);
        },
      });
    }
  }

  isCampoInvalido(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return !!(campo && campo.invalid && (campo.dirty || campo.touched));
  }
}
