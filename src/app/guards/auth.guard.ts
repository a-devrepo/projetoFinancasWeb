import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    router = inject(Router);

    canActivate() {

        const auth = sessionStorage.getItem('auth');

        if (!auth) {
            return this.router.parseUrl('/autenticar-usuario');
        }

        try {

            const bytes = CryptoJS.AES.decrypt(auth, 'auth');
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            const usuario = JSON.parse(decryptedData);

            const agora = new Date();
            const expiracao = new Date(usuario.dataHoraExpiracao);

            if (expiracao < agora) {
                sessionStorage.removeItem('auth');
                return this.router.parseUrl('/autenticar-usuario');
            }

            return true;

        } catch (e) {
            sessionStorage.removeItem('auth');
            return this.router.parseUrl('/autenticar-usuario');
        }
    }
}