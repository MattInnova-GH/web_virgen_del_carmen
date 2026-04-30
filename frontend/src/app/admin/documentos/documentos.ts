import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-documentos',
  standalone: true,
  imports: [FormsModule, QuillModule],
  templateUrl: './documentos.html',
  styleUrl: './documentos.css',
})
export class AdminDocumentos implements OnInit {
  ngOnInit() {}

  // QUILL
  editorTheme = signal<'dark' | 'light'>('dark');
  
  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: [1, 2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean']
    ]
  };

  pdfViewer = signal<SafeResourceUrl | null>(null);

  openPdfViewer(event: Event, url: SafeResourceUrl) {
    event.stopPropagation();
    this.pdfViewer.set(url);
  }

  closePdfViewer() {
    this.pdfViewer.set(null);
  }

  toggleEditorTheme() {
    this.editorTheme.set(
      this.editorTheme() === 'dark' ? 'light' : 'dark'
    );
  }
}