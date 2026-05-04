import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';

@Component({
  selector: 'app-reglamentos',
  imports: [VistaArchivos],
  templateUrl: './reglamentos.html',
  styleUrl: './reglamentos.css',
})
export class Reglamentos implements OnInit {

  private http = inject(HttpClient);
  private API = 'http://localhost:3000/api/academic_papers';
  private BASE = 'http://localhost:3000';

  reglamentosDocs = signal<any[]>([]);

  ngOnInit() {
    this.http.get<any[]>(`${this.API}/list`).subscribe({
      next: data => {
        const reglamentos = data
          .filter(d => d.status && d.type === 'Reglamentos')
          .map(d => ({
            id: String(d.id),
            label: d.title.toUpperCase(),
            pdfUrl: d.pdf_url ? `${this.BASE}${d.pdf_url}` : ''
          }));
        this.reglamentosDocs.set(reglamentos);
      }
    });
  }
}