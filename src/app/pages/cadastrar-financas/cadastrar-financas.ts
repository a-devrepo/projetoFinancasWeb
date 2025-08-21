import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-cadastrar-financas',
  imports: [
    Navbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastrar-financas.html',
  styleUrl: './cadastrar-financas.css'
})
export class CadastrarFinancas {

  http = inject(HttpClient);
  mensagemSucesso = signal('');
  mensagemErro = signal('');
  
  categorias = signal<any[]>([]);

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
    const usuario = this.getSessionUser();
    const headers = { Authorization: `Bearer ${usuario.token}` }

    this.http.get('http://localhost:8084/api/v1/categorias', { headers })
      .subscribe(
        {
          next: (response) => {
            this.categorias.set(response as any[]);
          },
          error: (e) => {
            const mensagem = e.error?.message || 'Erro desconhecido do servidor';
            this.mensagemErro.set(`Erro ao carregar categorias: ${mensagem}`)
          }
        });
  }
  
  onSubmit(){
    const usuario = this.getSessionUser();
    const headers = { Authorization: `Bearer ${usuario.token}` }
    const movimentacao = this.form.getRawValue();

    this.http.post('http://localhost:8084/api/v1/movimentacoes', movimentacao, { headers })
    .subscribe(
      {
        next: () => {
          this.mensagemSucesso.set(`Movimentação ${movimentacao.nome} cadastrada com sucesso`);
          this.form.reset();
        },
        error: (e) => {
          const mensagem = e.error?.message || 'Erro desconhecido do servidor';
          this.mensagemErro.set(`Erro ao cadastrar movimentação: ${mensagem}`);
        }
      }
    )
  }
  
  private getSessionUser(): any {
    const auth = sessionStorage.getItem('auth');
    const decrypted = CryptoJS.AES.decrypt(auth as string, 'auth').toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  }
}
