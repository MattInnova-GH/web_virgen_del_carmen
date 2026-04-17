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
      label: 'REGLAMENTO INSTITUCIONAL',
      pdfUrl: 'assets/pdfs/reglamentos/PEI_2022-2027-JAE.pdf',
    },
    {
      id: '2',
      label: 'REGLAMENTO DE ORGANIZACIÓN Y FUNCIONES',
      pdfUrl: 'assets/pdfs/reglamentos/PEI_2022-2027-JAE.pdf',
    },
  ];
}
