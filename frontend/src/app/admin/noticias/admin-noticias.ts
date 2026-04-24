import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-noticias',
  standalone: true,
  imports: [FormsModule, QuillModule, DatePipe],
  templateUrl: './admin-noticias.html',
  styleUrl: './admin-noticias.css',
})
export class AdminNoticias implements OnInit {

  private http = inject(HttpClient);
  private API = 'http://localhost:3000/api/news';

  noticias = signal<any[]>([]);

  showModal = signal(false);
  isEditMode = signal(false);
  imageViewer = signal(false);

  editorTheme = signal<'dark' | 'light'>('dark');

  formData: any = {
    id: null,
    title: '',
    content: '',
    img_url: '',
    description: ''
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
        this.noticias.set(
          data.map(n => ({
            id: n.id,
            title: n.title,
            content: n.content,
            img_url: n.img_url,
            description: n.description,
            status: n.status,
            fecha: n.updatedAt
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

  openEditModal(n: any) {
    this.isEditMode.set(true);

    this.formData = {
      id: n.id,
      title: n.title,
      content: n.content,
      img_url: n.img_url,
      description: n.description
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
      content: '',
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
    this.http.post(`${this.API}/create`, this.formData).subscribe({
      next: () => {
        this.loadData(); // ← SIEMPRE recargar (consistencia)
        this.closeModal();
      },
      error: err => console.error(err)
    });
  }

  update() {
    this.http.put(`${this.API}/update/${this.formData.id}`, this.formData).subscribe({
      next: () => {
        this.loadData();
        this.closeModal();
      },
      error: err => console.error(err)
    });
  }

  delete(id: number) {
    if (!confirm('¿Cambiar estado de la noticia?')) return;

    this.http.delete(`${this.API}/delete/${id}`).subscribe({
      next: () => {
        this.loadData(); // ← CLAVE: NO eliminar del array
      },
      error: err => console.error(err)
    });
  }

  // =========================
  // IMAGE VIEWER
  // =========================
  openImageViewer(event: Event) {
    event.stopPropagation();
    this.imageViewer.set(true);
  }

  closeImageViewer() {
    this.imageViewer.set(false);
  }

  // =========================
  // THEME
  // =========================
  toggleEditorTheme() {
    this.editorTheme.set(
      this.editorTheme() === 'dark' ? 'light' : 'dark'
    );
  }

  // =========================
  // QUILL
  // =========================
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

  private COMMENTS_API = 'http://localhost:3000/api/comments';

  // =========================
  // COMMENTS STATE
  // =========================
  showCommentsModal = signal(false);
  comments = signal<any[]>([]);
  currentNewsId = signal<number | null>(null);

  // =========================
  // COMMENTS
  // =========================
  openCommentsModal(newsId: number) {
    this.currentNewsId.set(newsId);
    this.loadComments(newsId);
    this.showCommentsModal.set(true);
  }

  closeCommentsModal() {
    this.showCommentsModal.set(false);
  }

  loadComments(newsId: number) {
    this.http.get<any[]>(`${this.COMMENTS_API}/list?new_id=${newsId}`)
      .subscribe({
        next: (data) => {
          this.comments.set(data);
        },
        error: err => console.error(err)
      });
  }

  deleteComment(id: number) {
    if (!confirm('¿Eliminar comentario?')) return;

    this.http.delete(`${this.COMMENTS_API}/delete/${id}`)
      .subscribe({
        next: () => {
          // recargar lista sin cerrar modal
          this.loadComments(this.currentNewsId()!);
        },
        error: err => console.error(err)
      });
  }

}