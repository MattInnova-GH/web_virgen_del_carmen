import { Component, OnInit, Type, inject, signal } from '@angular/core';
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
  private sanitizer = inject(DomSanitizer);
  private http = inject(HttpClient);
  private API = 'http://localhost:3000/api/academic_papers';
  private BASE = 'http://localhost:3000';

  investigaciones = signal<any[]>([]);

  showModal = signal(false);
  isEditMode = signal(false);

  selectedFile: File | null = null;

  formData: any = {
    id: null,
    type: 'Programas',
    title: '',
    year: '',
    description: '',
    pdf_url: ''
  };

  ngOnInit() {
    this.loadData();
  }

  // =========================
  // DATA
  // =========================
  loadData() {
    this.http.get<any[]>(`${this.API}/list`).subscribe({
      next: (data) => {
        this.investigaciones.set(
          data.map(i => ({
            id: i.id,
            title: i.title,
            type: i.type,
            year: i.year,
            description: i.description,
            pdf_url: i.pdf_url
              ? this.sanitizer.bypassSecurityTrustResourceUrl(`${this.BASE}${i.pdf_url}`)
              : null,
            status: i.status,
            fecha: i.updatedAt
          }))
        );
      }
    });
  }

  // =========================
  // FILE
  // =========================
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    // preview local
    this.formData.pdf_url = this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(file)
    );
  }

  // =========================
  // MODAL
  // =========================
  openCreateModal() {
    this.isEditMode.set(false);
    this.resetForm();
    this.showModal.set(true);
  }

  openEditModal(i: any) {
    this.isEditMode.set(true);

    this.formData = {
      id: i.id,
      title: i.title,
      type: i.type,
      year: i.year,
      description: i.description,
      pdf_url: i.pdf_url
    };

    this.selectedFile = null;

    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  resetForm() {
    this.formData = {
      id: null,
      title: '',
      type:'',
      year: '',
      description: '',
      pdf_url: ''
    };
    this.selectedFile = null;
  }

  // =========================
  // CRUD
  // =========================
  save() {
    if (this.isEditMode()) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    const fd = new FormData();

    Object.keys(this.formData).forEach(key => {
      if (key !== 'pdf_url') {
        fd.append(key, this.formData[key] || '');
      }
    });

    if (this.selectedFile) {
      fd.append('file', this.selectedFile);
    }

    this.http.post(`${this.API}/create`, fd).subscribe({
      next: () => {
        this.loadData();
        this.closeModal();
      },
      error: err => console.error(err)
    });
  }

  update() {
    const fd = new FormData();

    Object.keys(this.formData).forEach(key => {
      if (key !== 'pdf_url') {
        fd.append(key, this.formData[key] || '');
      }
    });

    if (this.selectedFile) {
      fd.append('file', this.selectedFile);
    }

    this.http.put(`${this.API}/update/${this.formData.id}`, fd).subscribe({
      next: () => {
        this.loadData();
        this.closeModal();
      },
      error: err => console.error(err)
    });
  }

  delete(id: number) {
    if (!confirm('¿Desactivar documento?')) return;

    this.http.delete(`${this.API}/delete/${id}`).subscribe({
      next: () => this.loadData(),
      error: err => console.error(err)
    });
  }

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