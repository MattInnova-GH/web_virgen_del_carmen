import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';

@Component({
  selector: 'app-estadisticas',
  imports: [VistaArchivos],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css',
})
export class Estadisticas implements OnInit {

  private http = inject(HttpClient);
  private API = 'http://localhost:3000/api/academic_papers';
  private BASE = 'http://localhost:3000';

  estadisticasDocs = signal<any[]>([]);

  ngOnInit() {
    this.http.get<any[]>(`${this.API}/list`).subscribe({
      next: data => {
        const estadisticas = data
          .filter(d => d.status && d.type === 'Estadísticas')
          .map(d => ({
            id: String(d.id),
            label: d.title.toUpperCase(),
            pdfUrl: d.pdf_url ? `${this.BASE}${d.pdf_url}` : ''
          }));
        this.estadisticasDocs.set(estadisticas);
      }
    });
  }
}