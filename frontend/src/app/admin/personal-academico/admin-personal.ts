import { Component } from '@angular/core';

interface Docente {
  id: number;
  nombre: string;
  especialidad: string;
  condicion: 'nombrado' | 'contratado';
}

@Component({
  selector: 'app-admin-personal',
  imports: [],
  templateUrl: './admin-personal.html',
  styleUrl: './admin-personal.css',
})
export class AdminPersonal {
  docentes: Docente[] = [
    { id: 1, nombre: 'María López Ríos', especialidad: 'Educación Inicial', condicion: 'nombrado' },
    { id: 2, nombre: 'Carlos Mendoza Flores', especialidad: 'Educación Primaria', condicion: 'nombrado' },
    { id: 3, nombre: 'Ana Gutiérrez Soto', especialidad: 'Matemática', condicion: 'contratado' },
    { id: 4, nombre: 'Jorge Ramírez Chávez', especialidad: 'Comunicación', condicion: 'contratado' },
  ];
}
