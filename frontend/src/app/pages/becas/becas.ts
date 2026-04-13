import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-becas',
  imports: [RouterLink, CommonModule],
  templateUrl: './becas.html',
  styleUrl: './becas.css',
})
export class Becas {

  // =============================================
  // AQUI PONES LAS URLs DIRECTAS DEL SITIO DEL INSTITUTO
  // Formato: https://eespvirgendelcarmen.edu.pe/wp-content/uploads/.../archivo.pdf
  // =============================================
  documentos = [
    {
      titulo: 'Becas 1ros y 2dos Puestos 2023',
      url: 'https://eespvirgendelcarmen.edu.pe/wp-content/uploads/2026/03/PROTOCOLO-DE-ADMISION-2026.pdf'
    },
    {
      titulo: 'Becas 1ros y 2dos Puestos 2024',
      url: 'https://eespvirgendelcarmen.edu.pe/wp-content/uploads/2026/03/PROTOCOLO-DE-ADMISION-2026.pdf'
    },
    {
      titulo: 'Becas 1ros y 2dos Puestos 2025',
      url: 'https://eespvirgendelcarmen.edu.pe/wp-content/uploads/2026/03/PROTOCOLO-DE-ADMISION-2026.pdf'
    },
  ];

  documentoActivo = this.documentos[0];
  pdfUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.documentoActivo.url);
  }

  seleccionarDocumento(doc: any) {
    this.documentoActivo = doc;
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(doc.url);
  }
}
