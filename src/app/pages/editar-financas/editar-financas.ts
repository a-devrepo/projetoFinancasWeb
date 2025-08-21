import {Component, inject, signal } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-editar-financa',
  standalone: true,
  imports: [
    Navbar, 
    CommonModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-financas.html',
  styleUrl: './editar-financas.css'
})
export class EditarFinancas {
  
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);

  idMovimentacao = signal('');

  mensagemSucesso = signal('');
  mensagemErro = signal('');

  categorias = signal<any[]>([]);

  movimentacao: any = {
    id: '',
    nome: '',
    data: '',
    valor: 0.0,
    tipo: '',
    categoriaID:''
  };

  form = new FormGroup(
    {
      nome: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
      data: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required, Validators.min(0.01)]),
      tipo: new FormControl('', [Validators.required]),
      categoriaId: new FormControl('', [Validators.required]),
    }
  )

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.mensagemErro.set('ID da movimentação não fornecido');
      return;  
    }
    this.idMovimentacao.set(id); 
    this.carregarCategorias();
  }

  private carregarCategorias(){
    const usuario = this.getSessionUser();
    const headers = { Authorization: `Bearer ${usuario.token}` }

    
      this.http.get('http://localhost:8084/api/v1/categorias', { headers })
        .subscribe({
          next: (response) => {
            this.categorias.set(response as any[]);
            this.carregarMovimentacao();
          },
          error: (e) => {
            const mensagem = e.error?.message || 'Erro desconhecido do servidor';
            this.mensagemErro.set(`Erro ao carregar categorias: ${mensagem}`);
          }
        });
  }

  carregarMovimentacao() {
    const usuario = this.getSessionUser();
    const headers = { Authorization: `Bearer ${usuario.token}` };

    this.http.get(`http://localhost:8084/api/v1/movimentacoes/${this.idMovimentacao()}`, { headers })
      .subscribe({
        next: (response: any) => {
          this.movimentacao = response;
          this.form.patchValue({
            nome: this.movimentacao.nome,
            data: this.movimentacao.data, 
            valor: this.movimentacao.valor,
            tipo: this.movimentacao.tipo,
            categoriaId: this.movimentacao.categoriaID
          });
        },
        error: (e) => {
          const mensagem = e.error?.message || 'Erro desconhecido do servidor';
          this.mensagemErro.set(`Erro ao carregar movimentação: ${mensagem}`);
        }
      });
  }
  
  confirmarAlteracao(){
    this.atualizar();  
  }
  atualizar() {
    const usuario = this.getSessionUser();
    const headers = { Authorization: `Bearer ${usuario.token}` };

    const movimentacao = this.form.getRawValue();

    this.http.put(`http://localhost:8084/api/v1/movimentacoes/${this.movimentacao.id}`, movimentacao, { headers })
      .subscribe({
        next: () => {
          this.mensagemSucesso.set('Movimentação atualizada com sucesso!');
        },
        error: (e) => {
          const mensagem = e.error?.message || 'Erro desconhecido do servidor';
          this.mensagemErro.set(`Erro ao atualizar: ${mensagem}`)
        }
      });
  }

  private getSessionUser(): any {
    const auth = sessionStorage.getItem('auth');
    const decrypted = CryptoJS.AES.decrypt(auth as string, 'auth').toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  }
}