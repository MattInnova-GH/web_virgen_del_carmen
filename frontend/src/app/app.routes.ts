import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Nosotros } from './pages/nosotros/nosotros';
import { Noticias } from './pages/noticias/noticias';
import { Programas } from './pages/programas/programas';
import { Transparencia } from './pages/transparencia/transparencia';
import { Admision } from './pages/admision/admision';
import { BecasYCreditos } from './pages/becas-y-creditos/becas-y-creditos';
import { Costos } from './pages/costos/costos';
import { Reglamentos } from './pages/reglamentos/reglamentos';
import { Inversiones } from './pages/inversiones/inversiones';
import { Procedimientos } from './pages/procedimientos/procedimientos';
import { Horarios } from './pages/horarios/horarios';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'nosotros', component: Nosotros },
  { path: 'noticias', component: Noticias },
  { path: 'programas', component: Programas },
  { path: 'admision', component: Admision },
  { path: 'transparencia', component: Transparencia },
  { path: 'becas', component: BecasYCreditos },
  { path: 'costos', component: Costos },
  { path: 'reglamentos', component: Reglamentos },
  { path: 'inversiones', component: Inversiones },
  { path: 'procedimientos', component: Procedimientos },
  { path: 'horarios', component: Horarios },
];
