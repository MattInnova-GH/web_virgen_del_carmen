import { Component } from '@angular/core';

interface Noticia {
  id: number;
  titulo: string;
  fecha: string;
  estado: 'publicado' | 'borrador';
}

@Component({
  selector: 'app-admin-noticias',
  imports: [],
  templateUrl: './admin-noticias.html',
  styleUrl: './admin-noticias.css',
})
export class AdminNoticias {
  noticias: Noticia[] = [
    { id: 1, titulo: 'Inicio del año académico 2024', fecha: '2024-03-01', estado: 'publicado' },
    { id: 2, titulo: 'Proceso de admisión 2025 abierto', fecha: '2024-11-15', estado: 'publicado' },
    { id: 3, titulo: 'Actividades de integración estudiantil', fecha: '2024-05-20', estado: 'borrador' },
  ];
}
