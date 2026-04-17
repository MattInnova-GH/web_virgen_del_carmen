import { Component } from '@angular/core';
import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';

@Component({
  selector: 'app-procedimientos',
  imports: [VistaArchivos],
  templateUrl: './procedimientos.html',
  styleUrl: './procedimientos.css',
})
export class Procedimientos {
  procedimientosDocs = [
    {
      id: '1',
      label: 'TUPA',
      pdfUrl: 'assets/pdfs/PROTOCOLO-DE-ADMISION-2026.pdf',
    },
    {
      id: '2',
      label: 'PLAN DE TRABAJO ANUAL',
      pdfUrl: 'assets/pdfs/REGLAMENTO-DE-ADMISION-2026-1.pdf',
    },
    {
      id: '3',
      label: 'MANUAL DE PROCESOS INSTITUCIONALES',
      pdfUrl: 'assets/pdfs/PROSPECTO-DE-ADMISION-2026.pdf',
    },
  ];
}
