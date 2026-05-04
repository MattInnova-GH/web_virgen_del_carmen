import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';

@Component({
  selector: 'app-becas-y-creditos',
  imports: [VistaArchivos],
  templateUrl: './becas-y-creditos.html',
  styleUrl: './becas-y-creditos.css',
})
export class BecasYCreditos implements OnInit {

  private http = inject(HttpClient);
  private API = 'http://localhost:3000/api/academic_papers';
  private BASE = 'http://localhost:3000';

  becasDocs = signal<any[]>([]);

  ngOnInit() {
    this.http.get<any[]>(`${this.API}/list`).subscribe({
      next: data => {
        const becas = data
          .filter(d => d.status && d.type === 'Becas y Créditos')
          .map(d => ({
            id: String(d.id),
            label: d.title.toUpperCase(),
            pdfUrl: d.pdf_url ? `${this.BASE}${d.pdf_url}` : ''
          }));
        this.becasDocs.set(becas);
      }
    });
  }
}