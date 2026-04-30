import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface ArticleConfig {
  apiList: string;
  contentField: string;
  volverLabel: string;
  volverLink: string;
  otrasLabel: string;
  detalleBase: string;
}

@Component({
  selector: 'app-noticia-detalle',
  imports: [CommonModule, RouterLink],
  templateUrl: './noticia-detalle.html',
  styleUrl: './noticia-detalle.css',
})
export class NoticiaDetalle implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private readonly baseApi = 'http://localhost:3000/api';

  noticia = signal<any>(null);
  loading = signal(true);
  error = signal(false);
  otrasNoticias = signal<any[]>([]);
  currentUrl = '';

  config: ArticleConfig = {
    apiList: `${this.baseApi}/news/list`,
    contentField: 'content',
    volverLabel: 'Volver a Noticias',
    volverLink: '/noticias',
    otrasLabel: 'Otras Noticias',
    detalleBase: '/noticias',
  };

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const tipo = this.route.snapshot.data['tipo'] ?? 'noticias';
    if (tipo === 'comunicado') {
      this.config = {
        apiList: `${this.baseApi}/press_releases/list`,
        contentField: 'press_release',
        volverLabel: 'Volver al Inicio',
        volverLink: '/inicio',
        otrasLabel: 'Otros Comunicados',
        detalleBase: '/comunicado',
      };
    }

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.currentUrl = encodeURIComponent(window.location.href);
      this.cargarArticulo(id);
    });
  }

  getContent(): string {
    return this.noticia()?.[this.config.contentField] || '';
  }

  private cargarArticulo(id: string | null): void {
    this.loading.set(true);
    this.error.set(false);
    this.noticia.set(null);

    this.http.get<any[]>(`${this.config.apiList}?id=${id}`).subscribe({
      next: data => {
        const activo = data.find((n: any) => n.status);
        if (activo) {
          this.noticia.set(activo);
        } else {
          this.error.set(true);
        }
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });

    this.http.get<any[]>(this.config.apiList).subscribe({
      next: data => {
        const otras = data
          .filter((n: any) => n.status && String(n.id) !== String(id))
          .slice(0, 3)
          .map((n: any) => ({
            ...n,
            contentPlain: this.stripHtml(n[this.config.contentField] || '')
          }));
        this.otrasNoticias.set(otras);
      }
    });
  }

  private stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}
