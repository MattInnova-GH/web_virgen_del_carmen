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
import { Psicopedagogico } from './pages/psicopedagógico/psicopedagógico';
import { SoporteMedico } from './pages/soporte-medico/soporte-medico';
import { ServicioSocial } from './pages/servicio-social/servicio-social';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio, title: 'Inicio' },
  { path: 'nosotros', component: Nosotros, title: 'Nosotros' },
  { path: 'noticias', component: Noticias, title: 'Noticias' },
  { path: 'programas', component: Programas, title: 'Programas' },
  { path: 'admision', component: Admision, title: 'Admision' },
  { path: 'transparencia', component: Transparencia, title: 'Transparencia' },
  { path: 'becas', component: BecasYCreditos, title: 'Becas y Créditos' },
  { path: 'costos', component: Costos, title: 'Costos' },
  { path: 'reglamentos', component: Reglamentos, title: 'Reglamentos' },
  { path: 'inversiones', component: Inversiones, title: 'Inversiones' },
  { path: 'procedimientos', component: Procedimientos, title: 'Procedimientos' },
  { path: 'horarios', component: Horarios, title: 'Horarios' },
  { path: 'psicopedagogico', component: Psicopedagogico, title: 'Soporte Psicopedagógico' },
  { path: 'soporte-medico', component: SoporteMedico, title: 'Soporte Médico' },
  { path: 'servicio-social', component: ServicioSocial, title: 'Servicio Social' },
];
