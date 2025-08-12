import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  nomeUsuario = signal('');
  emailUsuario = signal('');

  ngOnInit(){

    const auth = sessionStorage.getItem('auth');

    if(auth){
      const bytes = CryptoJS.AES.decrypt(auth, 'auth');
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      const usuario = JSON.parse(decryptedData);

      this.nomeUsuario.set(usuario.nome);
      this.emailUsuario.set(usuario.email);
    }
  }

  logout(){
    if(confirm('Deseja realmente sair do sistema?')){
      
      sessionStorage.removeItem('auth');

      location.href = '/';
    }
  }
}
