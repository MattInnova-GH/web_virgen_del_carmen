import { Component } from '@angular/core';
import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';

@Component({
  selector: 'app-inversiones',
  imports: [VistaArchivos],
  templateUrl: './inversiones.html',
  styleUrl: './inversiones.css',
})
export class Inversiones {
  inversionesDocs = [
    {
      id: '1',
      label: 'INVERSIONES',
      pdfUrl: '',
    },
    {
      id: '2',
      label: 'REINVERSIONES',
      pdfUrl: '',
    },
    {
      id: '3',
      label: 'DONACIONES',
      pdfUrl: '',
    },
    {
      id: '4',
      label: 'INFRAESTRUCTURA',
      pdfUrl: '',
    },
  ];
}
