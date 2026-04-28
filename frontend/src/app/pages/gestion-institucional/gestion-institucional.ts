import { Component } from '@angular/core';
import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';

@Component({
  selector: 'app-gestion-institucional',
  imports: [VistaArchivos],
  templateUrl: './gestion-institucional.html',
  styleUrl: './gestion-institucional.css',
})
export class GestionInstitucional {
  gestionDocs = [
    {
      id: '1',
      label: 'PROYECTO CURRICULAR INSTITUCIONAL',
      pdfUrl: 'assets/pdfs/gestion/PEI_2022-2027-JAE.pdf',
    },
  ];
}
