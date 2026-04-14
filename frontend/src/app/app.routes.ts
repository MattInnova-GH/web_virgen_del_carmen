import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Nosotros } from './pages/nosotros/nosotros';
import { Noticias } from './pages/noticias/noticias';
import { Programas } from './pages/programas/programas';
import { Transparencia } from './pages/transparencia/transparencia';
import { Admision } from './pages/admision/admision';

export const routes: Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'inicio', component: Inicio, title: 'Inicio'},
    {path: 'nosotros', component: Nosotros, title: 'Nosotros'},
    {path: 'noticias', component: Noticias, title: 'Noticias'},
    {path: 'programas', component: Programas, title: 'Programas'},
    {path: 'admision', component: Admision, title: 'Admision'},
    {path: 'transparencia', component: Transparencia, title: 'Transparencia'},
];
