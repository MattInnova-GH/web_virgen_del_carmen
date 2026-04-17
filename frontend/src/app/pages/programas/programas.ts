import { Component } from '@angular/core';

import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';

@Component({
  selector: 'app-programas',
  imports: [VistaArchivos],
  templateUrl: './programas.html',
  styleUrl: './programas.css',
})
export class Programas {
  docs = [
    {
      id: '1',
      label: 'PLAN DE ESTUDIOS',
      pdfUrl: 'assets/pdfs/programas/plan_de_estudios.pdf',
    },
    {
      id: '2',
      label: 'PERFIL DE EGRESO',
      pdfUrl: 'assets/pdfs/programas/perfil_de_egreso.pdf',
    },
    {
      id: '3',
      label: 'DISEÑO CURRICULAR - DCBN',
      pdfUrl:
        'assets/pdfs/programas/diseno_curricular_basico_nacional_de_la_formacion_inicial_docente.pdf',
    },
    {
      id: '4',
      label: 'SECCIONES - ESTUDIANTES',
      pdfUrl: 'assets/pdfs/programas/secciones_estudiantes.pdf',
    },
    {
      id: '5',
      label: 'PROCESO DE MATRICULA',
      pdfUrl: '',
    },
  ];
}
