import { Routes } from '@angular/router';
import { AutenticarUsuario } from './pages/autenticar-usuario/autenticar-usuario';
import { CriarUsuario } from './pages/criar-usuario/criar-usuario';
import { ConsultarFinancas } from './pages/consultar-financas/consultar-financas';
import { CadastrarCategorias } from './pages/cadastrar-categorias/cadastrar-categorias';
import { CadastrarFinancas } from './pages/cadastrar-financas/cadastrar-financas';
import { EditarFinancas } from './pages/editar-financas/editar-financas';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'autenticar-usuario', component: AutenticarUsuario
    },
    {
        path: 'criar-usuario', component: CriarUsuario
    },
    {
        path: 'consultar-financas', component: ConsultarFinancas, canActivate: [AuthGuard]
    },
    {
        path: 'cadastrar-categorias', component: CadastrarCategorias, canActivate: [AuthGuard]
    },
    {
        path: 'cadastrar-financas', component: CadastrarFinancas, canActivate: [AuthGuard]    
    },
    {
        path: 'editar-financas/:id', component: EditarFinancas, canActivate: [AuthGuard]    
    },
    {
        path: '', pathMatch: 'full', component: AutenticarUsuario, canActivate: [AuthGuard]
    }
];
