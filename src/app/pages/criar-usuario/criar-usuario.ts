import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-criar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './criar-usuario.html',
  styleUrl: './criar-usuario.css'
})
export class CriarUsuario {

  http = inject(HttpClient)
  mensagemSucesso = signal('');
  mensagemErro = signal('');

  form = new FormGroup(
    {
      nome: new FormControl('',[Validators.required,Validators.minLength(8)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      senha: new FormControl('',[Validators.required,Validators.minLength(8)]),
      senhaConfirmacao: new FormControl('',[Validators.required,Validators.minLength(8)])
    }
  );

  onSubmit() {
    this.mensagemSucesso.set('');
    this.mensagemErro.set('');

    if(this.form.value.senha !== this.form.value.senhaConfirmacao){
      this.mensagemErro.set('As senhas não conferem, por favor verifique');
      return;
    }
      const usuario = this.form.getRawValue();

      this.http.post('http://localhost:8082/api/v1/usuarios', usuario)
        .subscribe({
          next: (response:any) =>{
            this.mensagemSucesso.set(`Usuário criado com sucesso`);
          },
          error: (e) =>{
            const mensagem = e.error?.message || 'Erro desconhecido no servidor';
            this.mensagemErro.set(`Erro ao criar usuário: ${mensagem}`);
          }
        });
  }
}
