import { Routes } from '@angular/router';
import { AutenticarUsuario } from './pages/autenticar-usuario/autenticar-usuario';
import { CriarUsuario } from './pages/criar-usuario/criar-usuario';
import { ConsultarFinancas } from './pages/consultar-financas/consultar-financas';
import { CadastrarCategorias } from './pages/cadastrar-categorias/cadastrar-categorias';

export const routes: Routes = [
    {
        path: 'autenticar-usuario', component: AutenticarUsuario
    },
    {
        path: 'criar-usuario', component: CriarUsuario
    },
    {
        path: 'consultar-financas', component: ConsultarFinancas
    },
    {
        path: 'cadastrar-categorias', component: CadastrarCategorias
    },
    {
        path: '', pathMatch: 'full', component: AutenticarUsuario
    }
];
