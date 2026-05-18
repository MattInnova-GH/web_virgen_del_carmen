import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VistaArchivos } from '../../components/vista-archivos/vista-archivos';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-inversiones',
  imports: [VistaArchivos],
  templateUrl: './inversiones.html',
  styleUrl: './inversiones.css',
})
export class Inversiones implements OnInit {

  private http = inject(HttpClient);
  private API = `${environment.apiUrl}/academic_papers`;
  private BASE = environment.baseUrl;

  inversionesDocs = signal<any[]>([]);

  ngOnInit() {
    this.http.get<any[]>(`${this.API}/list`).subscribe({
      next: data => {
        const inversiones = data
          .filter(d => d.status && d.type === 'Inversiones')
          .map(d => ({
            id: String(d.id),
            label: d.title.toUpperCase(),
            pdfUrl: d.pdf_url ? `${this.BASE}${d.pdf_url}` : ''
          }));
        this.inversionesDocs.set(inversiones);
      }
    });
  }
}