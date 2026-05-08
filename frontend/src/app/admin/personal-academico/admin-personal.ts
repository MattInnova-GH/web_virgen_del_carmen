import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-personal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-personal.html',
  styleUrl: './admin-personal.css',
})
export class AdminPersonal implements OnInit {

  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/api/academic_personal';

  personal = signal<any[]>([]);

  showModal = signal(false);
  isEditMode = signal(false);

  formData: any = {
    id: null,
    type: 'Docente',
    names: '',
    last_names: '',
    institucional_email: '',
    position: '',
    grade: '',
    year: '',
    img_url: '',
    description: ''
  };

  ngOnInit(): void {
    this.loadData();
  }

  // DATA
  loadData() {
    this.http.get<any[]>(`${this.apiUrl}/list`).subscribe({
      next: (data) => {
        this.personal.set(
          data.map(item => ({
            id: item.id,
            names: item.names,
            last_names: item.last_names,
            full_name: `${item.names} ${item.last_names}`,
            institucional_email: item.institucional_email ?? '',
            type: item.type,
            position: item.position,
            grade: item.grade,
            year: item.year,
            img_url: item.img_url,
            status: item.status,
            fecha: item.updatedAt
          }))
        );
      }
    });
  }

  // MODAL
  openCreateModal() {
    this.isEditMode.set(false);
    this.resetForm();
    this.showModal.set(true);
  }

  openEditModal(p: any) {
    this.isEditMode.set(true);

    this.formData = {
      id: p.id,
      type: p.type,
      names: p.names,
      last_names: p.last_names,
      institucional_email: p.institucional_email,
      position: p.position,
      grade: p.grade,
      year: p.year,
      img_url: p.img_url,
      description: ''
    };

    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  resetForm() {
    this.formData = {
      id: null,
      type: 'Autoridad',
      names: '',
      last_names: '',
      institucional_email: '',
      position: '',
      grade: '',
      year: '',
      img_url: '',
      description: ''
    };
  }

  // CRUD
  save() {
    this.isEditMode() ? this.update() : this.create();
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
    if (!confirm('¿Cambiar estado del registro?')) return;

    this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe({
      next: () => this.loadData(),
      error: err => console.error(err)
    });
  }

  deleteModal = signal(false);
  deleteTargetId = signal<number | null>(null);
  tooltipVisible = signal(false);

  openDeleteModal(id: number) {
    this.deleteTargetId.set(id);
    this.deleteModal.set(true);
  }

  deleteAction(del: '0' | '1') {
    const id = this.deleteTargetId();

    if (!id) return;

    this.http.delete(`${this.apiUrl}/delete/${id}/${del}`).subscribe({
      next: () => {
        this.loadData();
        this.closeDeleteModal();
      },
      error: err => console.error(err)
    });
  }

  closeDeleteModal() {
    this.deleteModal.set(false);
    this.deleteTargetId.set(null);
  }

  showTooltip() {
    this.tooltipVisible.set(true);

    setTimeout(() => {
      this.tooltipVisible.set(false);
    }, 3000);
  }
}