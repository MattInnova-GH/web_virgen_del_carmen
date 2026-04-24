import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  menuItems = [
    {
      label: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      route: '/admin/dashboard',
    },
    {
      label: 'Noticias',
      icon: 'fas fa-newspaper',
      route: '/admin/noticias',
    },
    {
      label: 'Comunicados',
      icon: 'fas fa-bullhorn',
      route: '/admin/comunicados',
    },
    {
      label: 'Personal Académico',
      icon: 'fas fa-user-tie',
      route: '/admin/personal-academico',
    },
    {
      label: 'Trayectoria',
      icon: 'fas fa-user-tie',
      route: '/admin/trayectoria',
    },
    {
      label: 'Contactos',
      icon: 'fas fa-user-tie',
      route: '/admin/contactos',
    },
    {
      label: 'Investigaciones',
      icon: 'fas fa-user-tie',
      route: '/admin/investigaciones',
    },
    {
      label: 'Usuarios',
      icon: 'fas fa-user-tie',
      route: '/admin/usuarios',
    },
  ];
}
