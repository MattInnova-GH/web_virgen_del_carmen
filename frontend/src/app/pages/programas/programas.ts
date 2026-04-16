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
      label: 'Plan de Estudios',
      pdfUrl: 'assets/pdfs/PROTOCOLO-DE-ADMISION-2026.pdf',
    },
    {
      id: '2',
      label: 'Perfil de Egreso',
      pdfUrl: 'assets/pdfs/REGLAMENTO-DE-ADMISION-2026-1.pdf',
    },
    {
      id: '3',
      label: 'Diseño Curricular - DCBN',
      pdfUrl: 'assets/pdfs/PROSPECTO-DE-ADMISION-2026.pdf',
    },
    {
      id: '4',
      label: 'Secciones - Estudiantes',
      pdfUrl: 'assets/pdfs/641637179_122187032042471870_4663264574361598806_n.pdf',
    },
    {
      id: '5',
      label: 'Proceso de Matricula',
      pdfUrl: 'assets/pdfs/641637179_122187032042471870_4663264574361598806_n.pdf',
    },
  ];
}

