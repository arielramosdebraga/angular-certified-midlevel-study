import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';

import { CategoriaService } from '@pages/categorias/categoria.service';
import { Categoria } from '@pages/categorias/categoria';
import { LugarService } from '../lugar.service';
import { Lugar } from '../lugar';

@Component({
  selector: 'app-lugar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss',
})
export class LugarComponent implements OnInit {
  camposForm: FormGroup;
  categorias: Categoria[] = [];
  private categoriaService = inject(CategoriaService);
  private lugarService = inject(LugarService);

  constructor() {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  ngOnInit(): void {
    this.categoriaService.obterTodas().subscribe({
      next: (listaCategorias) => (this.categorias = listaCategorias),
      error: (error) => {
        console.error('Ocorreu um erro ao carregar as categorias:', error);
      },
    });
  }

  salvar() {
    if (this.camposForm.valid) {
      const novoLugar: Lugar = this.camposForm.value;

      this.lugarService.salvar(novoLugar).subscribe({
        next: (response) => {
          console.log('Lugar salvo com sucesso!:', response);
          this.camposForm.reset();
        },
        error: (error) => {
          console.error('Ocorreu um erro ao salvar o lugar:', error);
        },
      });
      console.log('Dados do lugar válidos para salvar:', novoLugar);
    }
  }

  isCampoInvalido(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return !!(campo && campo.invalid && (campo.dirty || campo.touched));
  }
}
