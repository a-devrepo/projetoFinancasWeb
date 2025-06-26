import { Routes } from '@angular/router';
import { AutenticarUsuario } from './pages/autenticar-usuario/autenticar-usuario';
import { CriarUsuario } from './pages/criar-usuario/criar-usuario';

export const routes: Routes = [
    {
        path: 'autenticar-usuario', component: AutenticarUsuario
    },
    {
        path: 'criar-usuario', component: CriarUsuario
    },
    {
        path: '', pathMatch: 'full', component: AutenticarUsuario
    }
];
