import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';

@Component({
  selector: 'app-programas',
  imports: [VistaArchivos],
  templateUrl: './programas.html',
  styleUrl: './programas.css',
})
export class Programas implements OnInit {

  private http = inject(HttpClient);
  private API = 'http://localhost:3000/api/academic_papers';
  private BASE = 'http://localhost:3000';

  docs = signal<any[]>([]);

  ngOnInit() {
    this.http.get<any[]>(`${this.API}/list`).subscribe({
      next: data => {
        const programas = data
          .filter(d => d.status && d.type === 'Programas')
          .map(d => ({
            id: String(d.id),
            label: d.title.toUpperCase(),
            pdfUrl: d.pdf_url ? `${this.BASE}${d.pdf_url}` : ''
          }));
        this.docs.set(programas);
      }
    });
  }
}