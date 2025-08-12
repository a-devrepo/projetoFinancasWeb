import { Component, inject, signal } from '@angular/core';
import { Navbar } from "../../shared/navbar/navbar";
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastrar-categorias',
  imports: [
    Navbar, 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastrar-categorias.html',
  styleUrl: './cadastrar-categorias.css'
})
export class CadastrarCategorias {

  mensagemSucesso = signal('');
  mensagemErro = signal('');

  http = inject(HttpClient);

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  onSubmit() {

    this.mensagemSucesso.set('');
    this.mensagemErro.set('');

    const auth = sessionStorage.getItem('auth');
    const decrypted = CryptoJS.AES.decrypt(auth as string, 'auth').toString(CryptoJS.enc.Utf8);
    const usuario = JSON.parse(decrypted);

    const headers = { Authorization: `Bearer ${usuario.token}` };

    const categoria = this.form.getRawValue();

    this.http.post('http://localhost:8084/api/v1/categorias', categoria, { headers })
      .subscribe({
        next: () => {
          this.mensagemSucesso.set(`Categoria ${categoria.nome} cadastrada com sucesso!`);
          this.form.reset();
        },
        error: (e) => {
          const mensagem = e.error?.message || 'Error desconhecido do servidor.'
          this.mensagemErro.set(`Erro ao cadastrar categoria: ${mensagem}`);
        }
      })
  }
}