import { Component } from '@angular/core';

interface Comunicado {
  id: number;
  asunto: string;
  dirigido: string;
  fecha: string;
}

@Component({
  selector: 'app-admin-comunicados',
  imports: [],
  templateUrl: './admin-comunicados.html',
  styleUrl: './admin-comunicados.css',
})
export class AdminComunicados {
  comunicados: Comunicado[] = [
    { id: 1, asunto: 'Suspensión de clases por feriado', dirigido: 'Todos', fecha: '2024-04-10' },
    { id: 2, asunto: 'Reunión de docentes — Semana pedagógica', dirigido: 'Docentes', fecha: '2024-06-03' },
    { id: 3, asunto: 'Entrega de notas del primer semestre', dirigido: 'Estudiantes', fecha: '2024-08-15' },
  ];
}
