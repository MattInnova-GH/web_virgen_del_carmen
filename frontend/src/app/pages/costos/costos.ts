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
      pdfUrl: '',
    },
    {
      id: '2',
      label: 'OTROS PAGOS',
      pdfUrl: '',
    },
  ];
}
