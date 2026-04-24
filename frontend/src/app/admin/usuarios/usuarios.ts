import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class AdminUsuarios implements OnInit {

  private http = inject(HttpClient);
  private API = 'http://localhost:3000/api/users';

  usuarios = signal<any[]>([]);

  showModal = signal(false);
  isEditMode = signal(false);

  formData: any = {
    id: null,
    names: '',
    last_names: '',
    username: '',
    password: '',
    description: ''
  };

  ngOnInit(): void {
    this.loadData();
  }

  // =========================
  // DATA
  // =========================
  loadData() {
    this.http.get<any[]>(`${this.API}/list`).subscribe({
      next: (data) => {
        this.usuarios.set(
          data.map(u => ({
            id: u.id,
            names: u.names,
            last_names: u.last_names,
            username: u.username,
            description: u.description,
            status: u.status,
            fecha: u.createdAt
          }))
        );
      },
      error: err => console.error(err)
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

  openEditModal(u: any) {
    this.isEditMode.set(true);

    this.formData = {
      id: u.id,
      names: u.names,
      last_names: u.last_names,
      username: u.username,
      password: '', // no se muestra ni edita
      description: u.description
    };

    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  resetForm() {
    this.formData = {
      id: null,
      names: '',
      last_names: '',
      username: '',
      password: '',
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
        this.loadData();
        this.closeModal();
      },
      error: err => console.error(err)
    });
  }

  update() {
    const body = {
      names: this.formData.names,
      last_names: this.formData.last_names,
      username: this.formData.username,
      description: this.formData.description
    };

    this.http.put(`${this.API}/update/${this.formData.id}`, body).subscribe({
      next: () => {
        this.loadData();
        this.closeModal();
      },
      error: err => console.error(err)
    });
  }

  delete(id: number) {
    if (!confirm('¿Desactivar usuario?')) return;

    this.http.delete(`${this.API}/delete/${id}`).subscribe({
      next: () => this.loadData(), // importante: NO eliminar del array
      error: err => console.error(err)
    });
  }
}