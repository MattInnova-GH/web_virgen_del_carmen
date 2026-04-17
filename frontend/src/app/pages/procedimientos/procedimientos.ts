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
      pdfUrl: '',
    },
    {
      id: '2',
      label: 'PLAN DE TRABAJO ANUAL',
      pdfUrl: '',
    },
    {
      id: '3',
      label: 'MANUAL DE PROCESOS INSTITUCIONALES',
      pdfUrl: '',
    },
  ];
}
