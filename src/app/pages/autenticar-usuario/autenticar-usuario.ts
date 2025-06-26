import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.html',
  styleUrl: './autenticar-usuario.css'
})
export class AutenticarUsuario {
  
  http = inject(HttpClient)

  form = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl('')
  });

  onSubmit(){
    this.http.post('http://localhost:8082/api/v1/usuarios/autenticar', this.form.value)
    .subscribe((response) => {
      console.log(response);
    });
  }
}
