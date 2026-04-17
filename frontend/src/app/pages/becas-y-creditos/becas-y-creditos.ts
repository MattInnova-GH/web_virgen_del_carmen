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
      label: 'BECAS 1ROS Y 2DOS PUESTOS 2021',
      pdfUrl: '',
    },
    {
      id: '2',
      label: 'BECAS 1ROS Y 2DOS PUESTOS 2022',
      pdfUrl: '',
    },
    {
      id: '3',
      label: 'BECAS 1ROS Y 2DOS PUESTOS 2023',
      pdfUrl: '',
    },
    {
      id: '4',
      label: 'CREDITOS EDUCATIVOS',
      pdfUrl: '',
    },
  ];
}
