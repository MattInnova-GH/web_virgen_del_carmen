import { Component, signal, input, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { PdfDocument } from '../models/pdf-document';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-vista-archivos',
  standalone: true,
  imports: [NgClass],
  templateUrl: './vista-archivos.html',
  styleUrl: './vista-archivos.css',
})
export class VistaArchivos {
  readonly documents = input<PdfDocument[]>([]);

  readonly activeId = signal<string | null>(null);

  private sanitizer = inject(DomSanitizer);

  constructor() {
    setTimeout(() => {
      const docs = this.documents();
      if (docs.length) {
        this.activeId.set(docs[0].id);
      }
    });
  }

  selectDocument(id: string) {
    this.activeId.set(id);
  }

  activeDocument() {
    return this.documents().find((d) => d.id === this.activeId());
  }

  safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
