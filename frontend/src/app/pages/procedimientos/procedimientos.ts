import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';

@Component({
  selector: 'app-procedimientos',
  imports: [VistaArchivos],
  templateUrl: './procedimientos.html',
  styleUrl: './procedimientos.css',
})
export class Procedimientos implements OnInit {

  private http = inject(HttpClient);
  private API = 'http://localhost:3000/api/academic_papers';
  private BASE = 'http://localhost:3000';

  procedimientosDocs = signal<any[]>([]);

  ngOnInit() {
    this.http.get<any[]>(`${this.API}/list`).subscribe({
      next: data => {
        const procedimientos = data
          .filter(d => d.status && d.type === 'Procedimientos')
          .map(d => ({
            id: String(d.id),
            label: d.title.toUpperCase(),
            pdfUrl: d.pdf_url ? `${this.BASE}${d.pdf_url}` : ''
          }));
        this.procedimientosDocs.set(procedimientos);
      }
    });
  }
}