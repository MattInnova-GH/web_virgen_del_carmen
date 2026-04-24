import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-comunicados',
  standalone: true,
  imports: [FormsModule, QuillModule, DatePipe],
  templateUrl: './admin-comunicados.html',
  styleUrl: './admin-comunicados.css',
})
export class AdminComunicados implements OnInit {

  private http = inject(HttpClient);

  apiUrl = 'http://localhost:3000/api/press_releases';

  comunicados = signal<any[]>([]);

  showModal = signal(false);
  isEditMode = signal(false);

  formData: any = {
    id: null,
    title: '',
    press_release: '',
    img_url: '',
    description: ''
  };

  ngOnInit(): void {
    this.loadData();
  }

  // =========================
  // DATA
  // =========================
  loadData() {
    this.http.get<any[]>(`${this.apiUrl}/list`).subscribe({
      next: (data) => {
        this.comunicados.set(
          data.map(item => ({
            id: item.id,
            title: item.title,
            content: item.press_release,
            img_url: item.img_url,
            description: item.description,
            status: item.status,
            fecha: item.updatedAt
          }))
        );
      }
    });
  }

  // =========================
  // MODAL
  // =========================
  openCreateModal() {
    this.isEditMode.set(false);
    this.resetForm();
    this.showModal.set(true);
  }

  openEditModal(com: any) {
    this.isEditMode.set(true);

    this.formData = {
      id: com.id,
      title: com.title,
      press_release: com.content,
      img_url: com.img_url,
      description: com.description
    };

    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  resetForm() {
    this.formData = {
      id: null,
      title: '',
      press_release: '',
      img_url: '',
      description: ''
    };
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
    this.http.post(`${this.apiUrl}/create`, this.formData).subscribe({
      next: () => {
        this.loadData();
        this.closeModal();
      },
      error: err => console.error(err)
    });
  }

  update() {
    this.http.put(`${this.apiUrl}/update/${this.formData.id}`, this.formData).subscribe({
      next: () => {
        this.loadData();
        this.closeModal();
      },
      error: err => console.error(err)
    });
  }

  delete(id: number) {
    if (!confirm('¿Eliminar comunicado?')) return;

    this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe({
      next: () => this.loadData(),
      error: err => console.error(err)
    });
  }

  imageViewer = signal(false);

  openImageViewer(event: Event) {
    event.stopPropagation();
    this.imageViewer.set(true);
  }

  closeImageViewer() {
    this.imageViewer.set(false);
  }

  editorTheme = signal<'dark' | 'light'>('dark');

  toggleEditorTheme() {
    this.editorTheme.set(
      this.editorTheme() === 'dark' ? 'light' : 'dark'
    );
  }

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

}