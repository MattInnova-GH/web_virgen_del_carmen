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

  docentes = signal<any[]>([]);

  // estado modal
  showModal = signal(false);
  isEditMode = signal(false);

  // modelo formulario
  formData: any = {
    id: null,
    type: 'Docente',
    names: '',
    last_names: '',
    grade: '',
    img_url: '',
    year: '',
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
        this.docentes.set(
          data.map(item => ({
            id: item.id,
            nombre: `${item.names} ${item.last_names}`,
            especialidad: item.grade,
            tipo: item.type,
            anio: item.year,
            img_url: item.img_url,
            status: item.status
          }))
        );
      }
    });
  }

  // =========================
  // MODAL CONTROL
  // =========================
  openCreateModal() {
    this.isEditMode.set(false);
    this.resetForm();
    this.showModal.set(true);
  }

  openEditModal(docente: any) {
    this.isEditMode.set(true);

    const [names, ...lastParts] = docente.nombre.split(' ');

    this.formData = {
      id: docente.id,
      type: docente.tipo,
      names: names,
      last_names: lastParts.join(' '),
      grade: docente.especialidad,
      img_url: docente.img_url,
      year: docente.anio,
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
      type: 'Docente',
      names: '',
      last_names: '',
      grade: '',
      img_url: '',
      year: '',
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
    if (!confirm('¿Seguro que deseas eliminar este docente?')) return;

    this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe({
      next: () => this.loadData(),
      error: err => console.error(err)
    });
  }
}