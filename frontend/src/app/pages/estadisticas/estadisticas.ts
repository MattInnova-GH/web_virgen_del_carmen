import { Component } from '@angular/core';
import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';

@Component({
  selector: 'app-estadisticas',
  imports: [VistaArchivos],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css',
})
export class Estadisticas {
  estadisticasDocs = [
    {
      id: '1',
      label: 'INGRESANTES 2022 - I,II',
      pdfUrl: '',
    },
    {
      id: '2',
      label: 'MATRICULADOS 2022 - I,II',
      pdfUrl: '',
    },
    {
      id: '3',
      label: 'EGRESADOS 2022 - I,II',
      pdfUrl: '',
    },
  ];
}
