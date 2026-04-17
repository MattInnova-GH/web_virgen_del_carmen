import { Component } from '@angular/core';
import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';

@Component({
  selector: 'app-admision',
  imports: [VistaArchivos],
  templateUrl: './admision.html',
  styleUrl: './admision.css',
})
export class Admision {
  docs = [
    {
      id: '1',
      label: 'PROTOCOLO DE ADMISIÓN 2026-I',
      pdfUrl: 'assets/pdfs/admision/PROTOCOLO-DE-ADMISION-2026.pdf',
    },
    {
      id: '2',
      label: 'REGLAMENTO DE ADMISIÓN 2026-I',
      pdfUrl: 'assets/pdfs/admision/REGLAMENTO-DE-ADMISION-2026-1.pdf',
    },
    {
      id: '3',
      label: 'PROSPECTO',
      pdfUrl: 'assets/pdfs/admision/PROSPECTO-DE-ADMISION-2026.pdf',
    },
    {
      id: '4',
      label: 'CRONOGRAMA DE ADMISIÓN 2026-I',
      pdfUrl: 'assets/pdfs/admision/641637179_122187032042471870_4663264574361598806_n.pdf',
    },
  ];
}
