import { Component, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-mesa-de-partes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mesa-de-partes.html',
  styleUrl: './mesa-de-partes.css'
})
export class MesaDePartesAdmin implements OnInit {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  private BASE = environment.baseUrl;
  tramites = signal<any[]>([]);
  
  showModal = false;
  tramiteSeleccionado: any = null;
  pdfSafeUrl: SafeResourceUrl | null = null;
  isLoading = false;

  mostrarPdfFlotante = signal<boolean>(false);

  ngOnInit(): void {
    this.obtenerTramites();
  }

  obtenerTramites(): void {
    this.http.get<any[]>(`${environment.apiUrl}/digital_intake_office/list`).subscribe({
      next: (data) => {
        this.tramites.set(
          data.map(tramite => {
            let estadoDefecto = 'Pendiente';
            if (tramite.processing_status === 'Aceptado') {
              estadoDefecto = 'Aceptado';
            } else if (tramite.processing_status === 'Rechazado') {
              estadoDefecto = 'Rechazado';
            }
            return {
              ...tramite,
              fechaFormateada: tramite.created_at || tramite.fecha || tramite.createdAt || new Date(),
              statusNormalized: estadoDefecto
            };
          })
        );
      },
      error: (err) => {
        console.error('Error al cargar la mesa de partes:', err);
      }
    });
  }

  abrirEvaluacion(tramite: any): void {
    this.tramiteSeleccionado = tramite;
    this.showModal = true;
    this.mostrarPdfFlotante.set(false);

    const rutaRelativa = tramite.attached_file_url || tramite.archivo || tramite.document_url || tramite.link_documento;
    if (rutaRelativa) {
      const urlCompleta = rutaRelativa.startsWith('http') 
        ? rutaRelativa 
        : `${this.BASE}${rutaRelativa}`;

      this.pdfSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urlCompleta);
    } else {
      this.pdfSafeUrl = null;
    }
  }

  abrirPdfFlotante(): void {
    this.mostrarPdfFlotante.set(true);
  }

  cerrarPdfFlotante(): void {
    this.mostrarPdfFlotante.set(false);
  }

  cerrarModal(): void {
    this.showModal = false;
    this.tramiteSeleccionado = null;
    this.pdfSafeUrl = null;
    this.mostrarPdfFlotante.set(false);
  }

  actualizarEstado(nuevoEstado: 'Aceptado' | 'Rechazado'): void {
    if (!this.tramiteSeleccionado || this.isLoading) return;

    const id = this.tramiteSeleccionado.id;
    const payload = { processing_status: nuevoEstado };

    this.isLoading = true;

    this.http.put(
      `${environment.apiUrl}/digital_intake_office/update/${id}`,
      payload
    ).subscribe({
      next: () => {
        this.tramites.update(listaActual => 
          listaActual.map(t => {
            if (t.id === id) {
              return {
                ...t,
                processing_status: nuevoEstado,
                statusNormalized: nuevoEstado
              };
            }
            return t;
          })
        );

        this.cdRef.detectChanges(); // Esto fuerza la detección de cambios
        setTimeout(() => {
          this.isLoading = false;
          this.cerrarModal();
        }, 400);
      },
      error: (err) => {
        console.error('Error al actualizar estado:', err);
        this.isLoading = false;
        alert('Ocurrió un error al intentar cambiar el estado del documento.');
      }
    });
  }

eliminarTramite(id: number): void {
    if (confirm('¿Está completamente seguro de que desea eliminar este ticket? Esta acción no se puede deshacer.')) {
      this.http.delete(`${environment.apiUrl}/digital_intake_office/delete/${id}`).subscribe({
        next: () => {
          this.tramites.update(listaActual => listaActual.filter(t => t.id !== id));
        },
        error: (err) => {
          console.error('Error al eliminar trámite:', err);
        }
      });
    }
  }
}