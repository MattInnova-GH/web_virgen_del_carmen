import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-costos',
  imports: [VistaArchivos],
  templateUrl: './costos.html',
  styleUrl: './costos.css',
})
export class Costos implements OnInit {

  private http = inject(HttpClient);
  private API = `${environment.apiUrl}/academic_papers`;
  private BASE = environment.baseUrl;

  pdfCostos = signal<any[]>([]);

  ngOnInit() {
    this.http.get<any[]>(`${this.API}/list`).subscribe({
      next: data => {
        const costos = data
          .filter(d => d.status && d.type === 'Costos')
          .map(d => ({
            id: String(d.id),
            label: d.title.toUpperCase(),
            pdfUrl: d.pdf_url ? `${this.BASE}${d.pdf_url}` : ''
          }));
        this.pdfCostos.set(costos);
      }
    });
  }
}