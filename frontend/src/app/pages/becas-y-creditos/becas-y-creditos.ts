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
      pdfUrl: 'assets/pdfs/PROTOCOLO-DE-ADMISION-2026.pdf',
    },
    {
      id: '2',
      label: 'BECAS 1ROS Y 2DOS PUESTOS 2022',
      pdfUrl: 'assets/pdfs/REGLAMENTO-DE-ADMISION-2026-1.pdf',
    },
    {
      id: '3',
      label: 'BECAS 1ROS Y 2DOS PUESTOS 2023',
      pdfUrl: 'assets/pdfs/PROSPECTO-DE-ADMISION-2026.pdf',
    },
    {
      id: '4',
      label: 'CREDITOS EDUCATIVOS',
      pdfUrl: 'assets/pdfs/641637179_122187032042471870_4663264574361598806_n.pdf',
    },
  ];
}
