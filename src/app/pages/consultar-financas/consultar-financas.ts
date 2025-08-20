import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
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
  changeDetector = inject(ChangeDetectorRef)

  mensagemSucesso = signal('');
  mensagemErro = signal('');
  
  movimentacoes: any[] = [];

  ngOnInit(): void{
    const usuario = this.getSessionUser();
    const headers = { Authorization: `Bearer ${usuario.token}` }
    
    this.http.get('http://localhost:8084/api/v1/movimentacoes', { headers })
      .subscribe(
        {
          next: (response) => {
            this.movimentacoes = response as any[];
            this.changeDetector.detectChanges();
          },
          error: (e) => {
            const mensagem = e.error?.message || 'Erro desconhecido do servidor';
            this.mensagemErro.set(`Erro ao carregar categorias: ${mensagem}`)
          }
        });
  }

  private getSessionUser(): any {
    const auth = sessionStorage.getItem('auth');
    const decrypted = CryptoJS.AES.decrypt(auth as string, 'auth').toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  }
}
