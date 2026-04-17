import { Component } from '@angular/core';
import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';

@Component({
  selector: 'app-costos',
  imports: [VistaArchivos],
  templateUrl: './costos.html',
  styleUrl: './costos.css',
})
export class Costos {
  pdfCostos = [
    {
      id: '1',
      label: 'PAGOS REALIZADOS POR LOS ESTUDIANTES',
      pdfUrl: 'assets/pdfs/PROTOCOLO-DE-ADMISION-2026.pdf',
    },
    {
      id: '2',
      label: 'OTROS PAGOS',
      pdfUrl: 'assets/pdfs/REGLAMENTO-DE-ADMISION-2026-1.pdf',
    },
  ];
}
