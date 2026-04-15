import { Component } from '@angular/core';
import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';

@Component({
  selector: 'app-reglamentos',
  imports: [VistaArchivos],
  templateUrl: './reglamentos.html',
  styleUrl: './reglamentos.css',
})
export class Reglamentos {
  reglamentosDocs = [
    {
      id: '1',
      label: 'PROTOCOLO DE ADMISIÓN 2026-I',
      pdfUrl: 'assets/pdfs/PROTOCOLO-DE-ADMISION-2026.pdf',
    },
    {
      id: '2',
      label: 'REGLAMENTO DE ADMISIÓN 2026-I',
      pdfUrl: 'assets/pdfs/REGLAMENTO-DE-ADMISION-2026-1.pdf',
    },
    {
      id: '3',
      label: 'PROSPECTO',
      pdfUrl: 'assets/pdfs/PROSPECTO-DE-ADMISION-2026.pdf',
    },
    {
      id: '4',
      label: 'CRONOGRAMA DE ADMISIÓN 2026-I',
      pdfUrl: 'assets/pdfs/641637179_122187032042471870_4663264574361598806_n.pdf',
    },
  ];
}
