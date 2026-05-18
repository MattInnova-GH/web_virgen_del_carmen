import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-procedimientos',
  imports: [VistaArchivos],
  templateUrl: './procedimientos.html',
  styleUrl: './procedimientos.css',
})
export class Procedimientos implements OnInit {

  private http = inject(HttpClient);
  private API = `${environment.apiUrl}/academic_papers`;
  private BASE = environment.baseUrl;

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