import {Component, inject, signal } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-consultar-financas',
  imports: [
    Navbar,
    CommonModule,
    RouterLink
  ],
  templateUrl: './consultar-financas.html',
  styleUrl: './consultar-financas.css'
})
export class ConsultarFinancas {

  http = inject(HttpClient)

  mensagemSucesso = signal('');
  mensagemErro = signal('');
  
  movimentacoes = signal<any[]>([]); 
  movimentacaoSelecionada:any = null;

  ngOnInit(): void{
    const usuario = this.getSessionUser();
    const headers = { Authorization: `Bearer ${usuario.token}` }
    
    this.http.get('http://localhost:8084/api/v1/movimentacoes', { headers })
      .subscribe(
        {
          next: (response) => {
            this.movimentacoes.set(response as any[]);
          },
          error: (e) => {
            const mensagem = e.error?.message || 'Erro desconhecido do servidor';
            this.mensagemErro.set(`Erro ao carregar categorias: ${mensagem}`)
          }
        });
  }

selecionarMovimentacao(movimentacao: any) {
  this.movimentacaoSelecionada = movimentacao;
}

confirmarExclusao() {
  if (!this.movimentacaoSelecionada) return;

  const usuario = this.getSessionUser();
  const headers = { Authorization: `Bearer ${usuario.token}` };

  this.http.delete(`http://localhost:8084/api/v1/movimentacoes/${this.movimentacaoSelecionada.id}`,{ headers })
    .subscribe({
      next: () => {
        this.mensagemSucesso.set('Movimentação excluída com sucesso!');
        this.movimentacoes.update(lista =>
          lista.filter(m => m.id !== this.movimentacaoSelecionada!.id)
        );
      this.movimentacaoSelecionada = null;
    },
    error: (e) => {
      const mensagem = e.error?.message || 'Erro desconhecido do servidor';
      this.mensagemErro.set(`Erro ao excluir: ${mensagem}`);
    }
  });
}

totalEntradas(): number {
  return this.movimentacoes()
    .filter(m => m.tipo === 'ENTRADA')
    .reduce((acc, m) => acc + m.valor, 0);
}

totalSaidas(): number {
  return this.movimentacoes()
    .filter(m => m.tipo === 'SAIDA')
    .reduce((acc, m) => acc + m.valor, 0);
}

saldo(): number {
  return this.totalEntradas() - this.totalSaidas();
}

  private getSessionUser(): any {
    const auth = sessionStorage.getItem('auth');
    const decrypted = CryptoJS.AES.decrypt(auth as string, 'auth').toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  }
}