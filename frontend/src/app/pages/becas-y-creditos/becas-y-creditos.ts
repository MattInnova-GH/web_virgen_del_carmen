import { Component } from '@angular/core';
import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';

@Component({
  selector: 'app-becas-y-creditos',
  imports: [VistaArchivos],
  templateUrl: './becas-y-creditos.html',
  styleUrl: './becas-y-creditos.css',
})
export class BecasYCreditos {
  becasDocs = [
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
