import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './autenticar-usuario.html',
  styleUrl: './autenticar-usuario.css'
})
export class AutenticarUsuario {
  
  http = inject(HttpClient)
  mensagemErro = signal('');
  
  form = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    senha: new FormControl('',[Validators.required,Validators.minLength(8)])
  });

  onSubmit(){

    const usuario = this.form.getRawValue();

    this.http.post('http://localhost:8082/api/v1/usuarios/autenticar', usuario)
    .subscribe({
      next: (response: any) => {
        
        const dados = CryptoJS.AES.encrypt(JSON.stringify(response),'auth').toString();
        sessionStorage.setItem('auth', dados);
        location.href = 'consultar-financas';
      },
      error: (e) => {
        const mensagem = e.error?.message || 'Erro desconhecido no servidor';
        this.mensagemErro.set(mensagem);
      }
    });
  }
}
